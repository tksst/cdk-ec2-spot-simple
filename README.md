# cdk-ec2-spot

CDK construct library to create EC2 Spot Instances simply.

## Install

```shell
$ npm install cdk-ec2-spot
```

## Usage

To set up a spot instance with default parameters, simply use "SpotInstance" instead of "ec2.Instance".

```typescript
import { SpotInstance } from "cdk-ec2-spot"
import * as ec2 from "aws-cdk-lib/ec2"

// Simple usage
new SpotInstance(this, "StoppableSpotInstance", {
    // Required properties of "ec2.Instance"
    vpc: ec2.Vpc.fromLookup(this, "defaultVPC", { isDefault: true });,
    instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3A, ec2.InstanceSize.NANO),
    machineImage: new ec2.AmazonLinuxImage(),
});

// Advanced usage
new SpotInstance(this, "StoppableSpotInstance", {
    // Required properties of "ec2.Instance"
    vpc: ec2.Vpc.fromLookup(this, "defaultVPC", { isDefault: true });,
    instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3A, ec2.InstanceSize.NANO),
    machineImage: new ec2.AmazonLinuxImage(),
    // SpotInstance specific property
    spotOptions: {
        interruptionBehavior: ec2.SpotInstanceInterruption.STOP,
        requestType: ec2.SpotRequestType.PERSISTENT,
        maxPrice: 0.007,
    },
});

```
