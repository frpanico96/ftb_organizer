import { Construct } from "constructs";
import { DatabaseStack } from "./DatabaseStack";
import { StackProps } from "aws-cdk-lib";
import { AttributeType, ITable, Table } from "aws-cdk-lib/aws-dynamodb";



export class ImagesDbStack extends DatabaseStack {

  constructor(scope: Construct, id: string, props?: StackProps){
    super(scope, id, props);

    /* Images DynamoDB Table */
    const imgDb: ITable = new Table(this, 'ImageTable', {
      partitionKey: {
        name: 'id',
        type: AttributeType.STRING,
      },
    });

    this.resourceDb = imgDb;

  }

}