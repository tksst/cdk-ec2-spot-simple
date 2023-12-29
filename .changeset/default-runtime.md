---
"cdk-ec2-spot-simple": minor
---

Change a default runtime from Node.js 16.  
If `@aws-cdk/aws-lambda-nodejs:useLatestRuntimeVersion` is set to `true`, `NODEJS_LATEST` is used.  
Otherwise, the latest version of `NODEJS_20_X`, `NODEJS_18_X` or `NODEJS_16_X` available in the CDK will be used.
