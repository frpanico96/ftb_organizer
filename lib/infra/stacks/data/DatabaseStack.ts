/**
 * 
 * DatabaseStack
 * Here all database are defined
 * 
 */
import { Duration, Stack, StackProps } from "aws-cdk-lib"
import { AttributeType, ITable, Table } from "aws-cdk-lib/aws-dynamodb";
import { Credentials, DatabaseClusterEngine, DatabaseSecret, ServerlessCluster } from "aws-cdk-lib/aws-rds";
import { Construct } from "constructs";
import { BaseStack } from "../../BaseStack";

export class DatabaseStack extends BaseStack{

  public resourceDb: ITable;
  // public readonly devicesDb: ITable;
  // public readonly imagesDb: ITable;

  constructor(scope: Construct, id: string, props?: StackProps){
    super(scope, id, props);

  }


}