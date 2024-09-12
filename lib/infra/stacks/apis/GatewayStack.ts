/** 
 * 
 * Main gateway definition
 * 
*/
import { StackProps } from "aws-cdk-lib";
import { RestApi } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";
import { BaseStack } from "../../BaseStack";


export class GatewayStack extends BaseStack {

  public readonly apiGateway: RestApi

  constructor(scope: Construct, id: string, props?: StackProps){
    super(scope, id, props);


    this.apiGateway = new RestApi(this, 'OrganizerApi');

  }


}