import { Construct } from "constructs";
import { LambdaStack } from "./LambdaStack";
import { LambdaStackProps } from "../../../interfaces/LambdaStackInterface";
import { ServerlessCluster } from "aws-cdk-lib/aws-rds";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import * as path from 'path';
import { Duration } from "aws-cdk-lib";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";

/**
 * 
 * Event Lambda Stack
 * 
 */
export class EventsLambdaStack extends LambdaStack{

  constructor(scope: Construct, id: string, props: LambdaStackProps){
    super(scope, id, props);



    const dbEvt: ServerlessCluster = props.db as ServerlessCluster;


    const func = new NodejsFunction(this, 'EventsLambda', {
      runtime: Runtime.NODEJS_20_X,
      handler: 'handler',
      entry: path.join(__dirname, '..', '..', '..', 'src','eventsLambda','handler.ts'),
      environment: {
        CLUSTER_ARN: dbEvt.clusterArn,
        SECRET_ARN: dbEvt.secret?.secretArn ?? '',
      },
      timeout: Duration.seconds(30),
    });


    dbEvt.grantDataApiAccess(func);

    this.lambdaIntegration = new LambdaIntegration(func);

  }


}