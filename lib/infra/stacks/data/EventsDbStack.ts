import { Construct } from "constructs";
import { DatabaseStack } from "./DatabaseStack";
import { StackProps } from "aws-cdk-lib";
import { AttributeType, ITable, Table } from "aws-cdk-lib/aws-dynamodb";



export class EventsDbStack extends DatabaseStack {

  constructor(scope: Construct, id: string, props?: StackProps){
    super(scope, id, props);

    /* Events DynamoDb Table */
    const evtDb: ITable = new Table(this, 'EventsTable', {
      partitionKey: {
        name: 'event_name',
        type: AttributeType.STRING,
      },
      sortKey: {
        name: 'proposal_timestamp',
        type: AttributeType.STRING,
      },
    });

    this.resourceDb = evtDb;

  }

}