/**
 * 
 * Device Lambda Stack definition
 * 
 */
import { Construct } from "constructs";
import { LambdaStackProps } from "../../interfaces/LambdaStackInterface";
import { LambdaStack } from "./LambdaStack";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import * as path from 'path';
import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";

export class DevicesLambdaStack extends LambdaStack{

  constructor(scope: Construct, id: string, props: LambdaStackProps){
    super(scope, id, props);


    const dbDevice: ITable = props.db as ITable;

    const func = new NodejsFunction(this, 'DevicesLambda', {
      runtime: Runtime.NODEJS_20_X,
      handler: 'handler',
      entry: path.join(__dirname, '..', '..', '..', 'src','devicesLambda','handler.ts'),
      environment: {
        TABLE_NAME: dbDevice.tableName,
      }
    });

    dbDevice.grantReadWriteData(func);


    this.lambdaIntegration = new LambdaIntegration(func);

  }


}