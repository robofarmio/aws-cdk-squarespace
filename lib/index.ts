import { Construct, Duration } from "@aws-cdk/core";
import { IHostedZone, CnameRecord, ARecord, RecordTarget } from "@aws-cdk/aws-route53";


export interface SquarespaceProps {
  // The hosted zone to set up for Squarespace
  readonly hostedZone: IHostedZone;
  // The verification code to set up for Squarespace
  readonly verificationCode: string;
}


export class Squarespace extends Construct {
  constructor(scope: Construct, id: string, props: SquarespaceProps) {
    super(scope, id);

    // https://support.squarespace.com/hc/en-us/articles/360035485391-DNS-records-for-connecting-third-party-domains

    new CnameRecord(scope, "Verify", {
      zone: props.hostedZone,
      domainName: "verify.squarespace.com",
      recordName: props.verificationCode,
      ttl: Duration.hours(24),
    });

    new CnameRecord(scope, "WWW", {
      zone: props.hostedZone,
      domainName: "ext-cust.squarespace.com",
      recordName: "www",
      ttl: Duration.hours(24),
    });

    const targets = [
      "198.185.159.144",
      "198.185.159.145",
      "198.49.23.144",
      "198.49.23.145",
    ];

    new ARecord(scope, "Alias", {
      zone: props.hostedZone,
      target: RecordTarget.fromIpAddresses(...targets),
      recordName: undefined,  // root zone
      ttl: Duration.hours(24),
    });
  }
}
