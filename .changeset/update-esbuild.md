---
"cdk-ec2-spot-simple": patch
---

update dev-dependency esbuild@0.19.2 from 0.17.7.<br>
Notice: This affects the code bundled with the custom lambda resource, which deletes your spot request but does not change the functionality.
