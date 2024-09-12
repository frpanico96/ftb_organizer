/**
 * 
 * Device Stack definition
 * 
*/
import { Stack } from "aws-cdk-lib";
import { Construct } from "constructs";
import { ApiStackProps } from "../../interfaces/ApiStackInterface";
import { BaseStack } from "../../BaseStack";

export class DevicesApiStack extends BaseStack {

  constructor(scope: Construct, id: string, props: ApiStackProps){
    super(scope, id, props);


    const deviceResource = props.restApi.root.addResource('devices');

    /* Methods definition */
    deviceResource.addMethod('GET', props.lambdaIntegration);

  }

}