import { Construct } from "constructs";
import { LambdaStack } from "./LambdaStack";
import { LambdaStackProps } from "../../interfaces/LambdaStackInterface";
import { ServerlessCluster } from "aws-cdk-lib/aws-rds";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import * as path from 'path';
import { Duration } from "aws-cdk-lib";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { ITable } from "aws-cdk-lib/aws-dynamodb";

/**
 * 
 * Event Lambda Stack
 * 
 */
export class EventsLambdaStack extends LambdaStack{

  constructor(scope: Construct, id: string, props: LambdaStackProps){
    super(scope, id, props);



    const dbEvt: ITable = props.db as ITable;


    const func = new NodejsFunction(this, 'EventsLambda', {
      runtime: Runtime.NODEJS_20_X,
      handler: 'handler',
      entry: path.join(__dirname, '..', '..', '..', 'src','eventsLambda','handler.ts'),
      environment: {
        TABLE_NAME: dbEvt.tableName,
      },
      timeout: Duration.seconds(30),
    });


    dbEvt.grantReadWriteData(func);

    this.lambdaIntegration = new LambdaIntegration(func);

  }


}