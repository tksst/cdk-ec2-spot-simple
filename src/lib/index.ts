import path from "node:path";
import { fileURLToPath } from "node:url";

import { CustomResource, Stack } from "aws-cdk-lib";
import type { CfnInstance, InstanceProps, LaunchTemplateSpotOptions } from "aws-cdk-lib/aws-ec2";
import { Instance, LaunchTemplate } from "aws-cdk-lib/aws-ec2";
import * as iam from "aws-cdk-lib/aws-iam";
import { Architecture, Code, Function, Runtime, RuntimeFamily } from "aws-cdk-lib/aws-lambda";
import { RetentionDays } from "aws-cdk-lib/aws-logs";
import { Provider } from "aws-cdk-lib/custom-resources";
import type { Construct } from "constructs";

const defaultRuntime = Runtime.NODEJS_16_X;
const defaultLogRetention = RetentionDays.THREE_MONTHS;

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export interface SpotInstanceProps extends InstanceProps {
    /**
     * The options for the Spot instances.
     * @default - Use the Launch Template's default InstanceMarketOptions.
     */
    spotOptions?: LaunchTemplateSpotOptions;

    /**
     * Log retention period for internal Lambda functions logs kept in CloudWatch Logs.
     * @default - Three months
     */
    lambdaLogRetention?: RetentionDays;
    /**
     * Internal Lambda functions execution role.
     * @default - Create a new Role that can do ec2:DescribeInstances and ec2:CancelSpotInstanceRequests and has "service-role/AWSLambdaBasicExecutionRole"
     */
    lambdaExcecutionRole?: iam.IRole;
    /**
     * Runtime environment for the internal Lambda function.
     * If anything other than Node.js is specified, an error will occur.
     * @default - Node.js 16
     */
    lambdaRuntime?: Runtime;
}

export class SpotInstance extends Instance {
    public constructor(scope: Construct, id: string, props: SpotInstanceProps) {
        super(scope, id, props);

        const templ = new LaunchTemplate(this, "LaunchTemplateForSpotReq", {
            spotOptions: props.spotOptions ?? {},
        });

        (this.node.defaultChild as CfnInstance).launchTemplate = {
            version: templ.versionNumber,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            launchTemplateId: templ.launchTemplateId!,
        };

        const lambdaExcecutionRole =
            props.lambdaExcecutionRole ??
            new iam.Role(this, "SpotReqCancelerHandlerExecutionRole", {
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

        const handler = new Function(this, "SpotReqCancelerHandler", {
            runtime,
            architecture: Architecture.ARM_64,
            memorySize: 128,
            role: lambdaExcecutionRole,
            logRetention,
            code: Code.fromAsset(path.join(dirname, "lambda")),
            handler: "index.handler",
        });

        const provider = new Provider(this, "SpotReqCancelerProvider", {
            onEventHandler: handler,
            logRetention,
        });

        new CustomResource(this, "SpotReqCanceler", {
            serviceToken: provider.serviceToken,
            properties: {
                ec2InstanceId: this.instanceId,
            },
        });
    }
}
