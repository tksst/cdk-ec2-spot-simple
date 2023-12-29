import { FeatureFlags } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import type { Construct } from "constructs";

export default (scope: Construct): Runtime => {
    const flags = FeatureFlags.of(scope);
    const useLatestRuntimeVersion = flags.isEnabled("@aws-cdk/aws-lambda-nodejs:useLatestRuntimeVersion");

    if (useLatestRuntimeVersion === true && "NODEJS_LATEST" in Runtime) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        return Runtime.NODEJS_LATEST as Runtime;
    }

    // CDK v2.109.0 support Node.js 20
    if ("NODEJS_20_X" in Runtime) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        return Runtime.NODEJS_20_X as Runtime;
    }

    // CDK v2.51.0 support Node.js 18
    if ("NODEJS_18_X" in Runtime) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        return Runtime.NODEJS_18_X as Runtime;
    }

    // CDK v2.24.0 support Node.js 16
    if ("NODEJS_16_X" in Runtime) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        return Runtime.NODEJS_16_X as Runtime;
    }

    throw new Error("Failed to determine a default Runtime version");
};
