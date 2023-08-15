# cdk-ec2-spot-simple

## [2.0.4](https://github.com/tksst/cdk-ec2-spot-simple/compare/v2.0.3...v2.0.4) (2023-05-05)


### Bug Fixes

* remove the reprecated "charset" option that causes an error on TypeScript 5.0 ([be7b96e](https://github.com/tksst/cdk-ec2-spot-simple/commit/be7b96eab451dd45edca3fa528f0e7c6e900755f))

## [2.0.3](https://github.com/tksst/cdk-ec2-spot-simple/compare/v2.0.2...v2.0.3) (2023-02-12)


### Performance Improvements

* reduce bundle size of Lambda code from 2.8MiB to 388KiB by enabling esbuild tree shaking through the AWS SDK ESM export import. ([ccfe8f3](https://github.com/tksst/cdk-ec2-spot-simple/commit/ccfe8f392bf89373ed941f4d8d7fa2d1d5bf7ec5))
* reduce bundle size of Lambda code from 4.8MiB to 2.8MiB by enabling esbuild minify-identifiers. ([39f5fda](https://github.com/tksst/cdk-ec2-spot-simple/commit/39f5fda05fc602cf067781f92e2ff5a919b56b9a))

## [2.0.2](https://github.com/tksst/cdk-ec2-spot-simple/compare/v2.0.1...v2.0.2) (2023-01-04)


### Bug Fixes

* "cdk synth" error if requestyType is `SpotRequestType.PERSISTENT` ([c871d69](https://github.com/tksst/cdk-ec2-spot-simple/commit/c871d69bffa3ad0af48f9f400ac38f1c1b8abb71))

## [2.0.1](https://github.com/tksst/cdk-ec2-spot-simple/compare/v2.0.0...v2.0.1) (2023-01-03)


### Bug Fixes

* This is a dummy commit that triggers automatic release. On v2.0.0 there was a bug where the wrong version was released, that was fixed on 5ee6cc20e718d0eee62571cb64d5d74e305c8aa7 ([41054c2](https://github.com/tksst/cdk-ec2-spot-simple/commit/41054c237be9663dff8cd9af1e3c1e2a7ffcc363))

## [2.0.0](https://github.com/tksst/cdk-ec2-spot-simple/compare/v1.0.0...v2.0.0) (2023-01-03)


### Features

* cdk-ec2-spot-simple is now a JSII module and provides libraries for other languages than TypeScript. ([ed38f81](https://github.com/tksst/cdk-ec2-spot-simple/commit/ed38f812dfa060c5462f4adf748ff08d2e3c1378))
* Each property of SpotInstanceProps and SpotReqCancelerProps is now read only. ([f912bf7](https://github.com/tksst/cdk-ec2-spot-simple/commit/f912bf7f7365a1482a60f39cb0576d46b217f5d6))


### BREAKING CHANGES

* Each property of SpotInstanceProps and SpotReqCancelerProps is now read only.

## 1.0.0 (2022-12-13)


### Bug Fixes

* execution error on commonjs ([f09cbd5](https://github.com/tksst/cdk-ec2-spot-simple/commit/f09cbd578b1ab5b1a8f985d3645a258bbf8d1116))


### Features

* CDK construct library to create EC2 Spot Instances simply ([ed8bba2](https://github.com/tksst/cdk-ec2-spot-simple/commit/ed8bba2d9ef8b8b9cc53db407805f3a8757e653b))
* CDK construct library to create EC2 Spot Instances simply ([22cf010](https://github.com/tksst/cdk-ec2-spot-simple/commit/22cf010f3d8653473f984ec49ee63a382d8a78d8))
* CDK construct library to create EC2 Spot Instances simply ([f9652fa](https://github.com/tksst/cdk-ec2-spot-simple/commit/f9652faadfddbb7d22f5f2dae0c9d60061339eab))
