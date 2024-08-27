/**
 * 
 * Api Stack props interface
 * 
 */
import { StackProps } from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";


export interface ApiStackProps extends StackProps {

  lambdaIntegration: LambdaIntegration;
  restApi: RestApi;

}