/** 
 * 
 * Main gateway definition
 * 
*/
import { Stack, StackProps } from "aws-cdk-lib";
import { RestApi } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";


export class GatewayStack extends Stack {

  public readonly apiGateway: RestApi

  constructor(scope: Construct, id: string, props?: StackProps){
    super(scope, id, props);


    this.apiGateway = new RestApi(this, 'OrganizerApi');

  }


}