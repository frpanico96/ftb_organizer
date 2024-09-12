import { Construct } from "constructs";
import { DatabaseStack } from "./DatabaseStack";
import { StackProps } from "aws-cdk-lib";
import { AttributeType, ITable, Table } from "aws-cdk-lib/aws-dynamodb";


export class DeviceDbStack extends DatabaseStack {

  constructor(scope: Construct, id: string, props?: StackProps){
    super(scope, id, props);

    /* Device DynamoDB Table*/
    const dvcDb: ITable = new Table(this, 'DeviceTable', {
      partitionKey: {
        name: 'device_id',
        type: AttributeType.STRING,
      },
    });

    this.resourceDb = dvcDb;

  }

}