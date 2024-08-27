/** 
 * 
 * Lambda Stack base class that must be extended from every other LambdaStack 
 * It exposes a single variable for the api integration
 * 
*/
import { Stack } from "aws-cdk-lib";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";
import { LambdaStackProps } from "../../../interfaces/LambdaStackInterface";

export class LambdaStack extends Stack{
  public lambdaIntegration: LambdaIntegration;

  constructor(scope: Construct, id: string, props: LambdaStackProps){
    super(scope, id, props);
  }

}