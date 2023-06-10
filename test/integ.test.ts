import { IntegTest } from "@aws-cdk/integ-tests-alpha";
import * as cdk from "aws-cdk-lib";
import { AmazonLinuxImage, InstanceClass, InstanceSize, InstanceType, SubnetType, Vpc } from "aws-cdk-lib/aws-ec2";

import { SpotInstance } from "../src/lib/index";

const app = new cdk.App();
const stack = new cdk.Stack(app);

const vpc = new Vpc(stack, "vpc", {
    maxAzs: 1,
    subnetConfiguration: [
        {
            name: "private",
            subnetType: SubnetType.PRIVATE_ISOLATED,
        },
    ],
    natGateways: 0,
});

new SpotInstance(stack, "instance", {
    vpc,
    instanceType: InstanceType.of(InstanceClass.T3A, InstanceSize.NANO),
    machineImage: new AmazonLinuxImage(),
});

const test = new IntegTest(app, "IntegTest", {
    testCases: [stack],
});

test.assertions.awsApiCall("Ec2", "")

