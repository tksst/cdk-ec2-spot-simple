import * as path from "node:path";

import { CustomResource, Stack } from "aws-cdk-lib";
import type { InstanceProps, LaunchTemplateSpotOptions } from "aws-cdk-lib/aws-ec2";
import { Instance, LaunchTemplate, SpotRequestType } from "aws-cdk-lib/aws-ec2";
import * as iam from "aws-cdk-lib/aws-iam";
import { Architecture, Code, Function, Runtime, RuntimeFamily } from "aws-cdk-lib/aws-lambda";
import { RetentionDays } from "aws-cdk-lib/aws-logs";
import { Provider } from "aws-cdk-lib/custom-resources";
import { Construct } from "constructs";

const defaultRuntime = Runtime.NODEJS_16_X;
const defaultLogRetention = RetentionDays.THREE_MONTHS;

/**
 * Options related to Lambda functions to cancel spot requests.
 */
export interface SpotReqCancelerProps {
    /**
     * Log retention period for internal Lambda functions logs kept in CloudWatch Logs.
     * @default - Three months
     */
    readonly lambdaLogRetention?: RetentionDays;
    /**
     * Internal Lambda functions execution role.
     * @default - Create a new Role that can do ec2:DescribeInstances and ec2:CancelSpotInstanceRequests and has "service-role/AWSLambdaBasicExecutionRole"
     */
    readonly lambdaExcecutionRole?: iam.IRole;
    /**
     * Runtime environment for the internal Lambda function.
     * If anything other than Node.js is specified, an error will occur.
     * @default - Node.js 16
     */
    readonly lambdaRuntime?: Runtime;
}

/**
 * Properties of `SpotInstance`
 */
export interface SpotInstanceProps extends InstanceProps {
    /**
     * Options related to Lambda functions to cancel spot requests.
     */
    readonly spotReqCancelerOptions?: SpotReqCancelerProps;

    /**
     * The options for the Spot instances.
     * @default - Use the Launch Template's default InstanceMarketOptions.
     */
    readonly spotOptions?: LaunchTemplateSpotOptions;
}

class SpotReqCanceler extends Construct {
    public constructor(scope: Construct, id: string, props: { instanceId: string } & SpotReqCancelerProps) {
        super(scope, id);

        const lambdaExcecutionRole =
            props.lambdaExcecutionRole ??
            new iam.Role(this, "HandlerExecutionRole", {
                assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
                managedPolicies: [
                    iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSLambdaBasicExecutionRole"),
                ],
                inlinePolicies: {
                    ec2: new iam.PolicyDocument({
                        statements: [
                            new iam.PolicyStatement({
                                effect: iam.Effect.ALLOW,
                                actions: ["ec2:DescribeInstances", "ec2:CancelSpotInstanceRequests"],
                                resources: ["*"],
                                conditions: {
                                    StringEquals: {
                                        "aws:RequestedRegion": [Stack.of(this).region],
                                    },
                                },
                            }),
                        ],
                    }),
                },
            });

        const logRetention = props.lambdaLogRetention ?? defaultLogRetention;

        const runtime = props.lambdaRuntime ?? defaultRuntime;

        if (runtime.family !== RuntimeFamily.NODEJS) {
            throw new Error("A runtime other than Node.js was specified.");
        }

        const handler = new Function(this, "Handler", {
            runtime,
            architecture: Architecture.ARM_64,
            memorySize: 128,
            role: lambdaExcecutionRole,
            logRetention,
            code: Code.fromAsset(path.join(__dirname, "../../dist/lambda")),
            handler: "index.handler",
        });

        const provider = new Provider(this, "Provider", {
            onEventHandler: handler,
            logRetention,
        });

        new CustomResource(this, "CustomResource", {
            serviceToken: provider.serviceToken,
            properties: {
                ec2InstanceId: props.instanceId,
            },
        });
    }
}

/**
 * This represents a single EC2 Spot instance and other necessary resources.
 */
export class SpotInstance extends Instance {
    public constructor(scope: Construct, id: string, props: SpotInstanceProps) {
        super(scope, id, props);

        const templ = new LaunchTemplate(this, "LaunchTemplateForSpotReq", {
            spotOptions: props.spotOptions ?? {},
        });

        this.instance.launchTemplate = {
            version: templ.versionNumber,
            launchTemplateId: templ.launchTemplateId,
        };

        if (props.spotOptions?.requestType === SpotRequestType.PERSISTENT) {
            // Persistent SpotReq remains after instance or stack destroys.
            // Therefore, create a custom resource to remove SpotReq when the stack is destroyed.
            new SpotReqCanceler(this, "SpotReqCanceler", {
                instanceId: this.instanceId,
                ...props.spotReqCancelerOptions,
            });
        }
    }
}
