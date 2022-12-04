import { App, Stack } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { AmazonLinuxImage, InstanceClass, InstanceSize, InstanceType, Vpc } from "aws-cdk-lib/aws-ec2";

import { SpotInstance } from "./index.js";

describe("SpotInstance", () => {
    it("to match the snapshot", () => {
        const app = new App();
        const stack = new Stack(app, "TestStack");

        new SpotInstance(stack, "Test", {
            vpc: new Vpc(stack, "Vpc", {}),
            instanceType: InstanceType.of(InstanceClass.M6G, InstanceSize.MEDIUM),
            machineImage: new AmazonLinuxImage(),
        });

        const template = Template.fromStack(stack);
        expect(template).toMatchSnapshot();
    });
});
