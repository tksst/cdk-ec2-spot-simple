import { App, Stack } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import {
    AmazonLinuxImage,
    InstanceClass,
    InstanceSize,
    InstanceType,
    SpotInstanceInterruption,
    SpotRequestType,
    Vpc,
} from "aws-cdk-lib/aws-ec2";

import { SpotInstance } from "./index.js";

function instanceProp(stack: Stack) {
    return {
        vpc: new Vpc(stack, "Vpc", {}),
        instanceType: InstanceType.of(InstanceClass.M6G, InstanceSize.MEDIUM),
        machineImage: new AmazonLinuxImage(),
    };
}

test("default SpotInstanceProps", () => {
    const app = new App();
    const stack = new Stack(app, "TestStack");

    new SpotInstance(stack, "Test", instanceProp(stack));

    expect(Template.fromStack(stack)).toMatchSnapshot();
});

test("SpotRequestType.PERSISTENT", () => {
    const app = new App();
    const stack = new Stack(app, "TestStack");

    new SpotInstance(stack, "Test", {
        ...instanceProp(stack),
        spotOptions: {
            requestType: SpotRequestType.PERSISTENT,
            interruptionBehavior: SpotInstanceInterruption.STOP,
        },
    });

    expect(Template.fromStack(stack)).toMatchSnapshot();
});

test("SpotRequestType.ONE_TIME", () => {
    const app = new App();
    const stack = new Stack(app, "TestStack");

    new SpotInstance(stack, "Test", {
        ...instanceProp(stack),
        spotOptions: {
            requestType: SpotRequestType.ONE_TIME,
            interruptionBehavior: SpotInstanceInterruption.TERMINATE,
        },
    });

    expect(Template.fromStack(stack)).toMatchSnapshot();
});
