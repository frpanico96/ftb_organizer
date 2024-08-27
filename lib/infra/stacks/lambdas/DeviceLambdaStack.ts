/**
 * 
 * Device Lambda Stack definition
 * 
 */
import { Construct } from "constructs";
import { LambdaStackProps } from "../../../interfaces/LambdaStackInterface";
import { LambdaStack } from "./LambdaStack";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import * as path from 'path';
import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";

export class DeviceLambdaStack extends LambdaStack{

  constructor(scope: Construct, id: string, props: LambdaStackProps){
    super(scope, id, props);


    const dbEvents: ITable = props.db as ITable;

    const func = new NodejsFunction(this, 'DeviceLambda', {
      runtime: Runtime.NODEJS_20_X,
      handler: 'handler',
      entry: path.join(__dirname, '..', '..', '..', 'src','deviceLambda','handler.ts'),
      environment: {
        TABLE_NAME: dbEvents.tableName,
      }
    });


    this.lambdaIntegration = new LambdaIntegration(func);

  }


}