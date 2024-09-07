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

export class DatabaseStack extends Stack{

  public readonly eventsDb: ServerlessCluster;
  public readonly devicesDb: ITable;
  public readonly imagesDb: ITable;

  constructor(scope: Construct, id: string, props?: StackProps){
    super(scope, id, props);

    /* Aurora Serverless Cluster */
    // const dbSecret: DatabaseSecret = new DatabaseSecret(this, 'AuroraSecret',{
    //   username: 'admin',
    // });

    // const cluster: ServerlessCluster = new ServerlessCluster(this, 'AuroraCluster', {
    //   engine: DatabaseClusterEngine.AURORA_MYSQL,
    //   credentials: {username: 'admin'},
    //   clusterIdentifier: 'organizer-aurora-cluster',
    //   defaultDatabaseName: 'event-database',
    //   enableDataApi: true,
    //   scaling: {
    //     autoPause: Duration.minutes(10),
    //     minCapacity: 2,
    //     maxCapacity: 16,
    //   },
    // });

    /* Device DynamoDB Table*/
    const dvcDb: ITable = new Table(this, 'DeviceTable', {
      partitionKey: {
        name: 'device_id',
        type: AttributeType.STRING,
      },
    });

    /* Images DynamoDB Table */
    const imgDb: ITable = new Table(this, 'ImageTable', {
      partitionKey: {
        name: 'id',
        type: AttributeType.STRING,
      },
    });

    /* Assign Variables */
    //this.eventsDb = cluster;
    this.devicesDb = dvcDb;
    this.imagesDb = imgDb;


  }


}