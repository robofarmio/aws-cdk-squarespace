# aws-cdk-squarespace

AWS CDK constructs to set up a Squarespace website for a domain hosted on AWS.

    npm install aws-cdk-squarespace

```js
import { App, Stack, StackProps, } from "@aws-cdk/core";
import { HostedZone } from "@aws-cdk/aws-route53";

import { Squarespace } from "aws-cdk-squarespace";

class MyStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props)

    const hostedZone = HostedZone.fromLookup(this, "HostedZone", {
      domainName: "example.com",
    });

    new Squarespace(this, "Squarespace", {
      hostedZone: hostedZone,
      verificationCode: "my-domain-verification-code",
    });
  }
}
```

Follow [these instructions](https://support.squarespace.com/hc/en-us/articles/360035485391-DNS-records-for-connecting-third-party-domains) to get a domain verification code.


## Pre-flight Checklist

Here is a checklist to set up a new account before we can deploy stacks from this project.

- [x] [Bootstrap](https://docs.aws.amazon.com/cdk/latest/guide/bootstrapping.html) the AWS CDK in the AWS Account
- [x] In Route53, buy domains and make sure they have a default [hosted zone](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-working-with.html)


## Usage

Self-contained reproducible dev environment

    docker-compose build
    docker-compose run --rm dev bash


## License

Copyright © 2021 robofarm

Distributed under the MIT License (MIT).
