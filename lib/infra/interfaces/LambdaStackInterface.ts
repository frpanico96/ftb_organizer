/**
 * 
 * Lambda Props interface
 * 
 */
import { StackProps } from "aws-cdk-lib";
import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { ServerlessCluster } from "aws-cdk-lib/aws-rds";
import { Bucket } from "aws-cdk-lib/aws-s3";

export interface LambdaStackProps extends StackProps{
  db: ITable | ServerlessCluster;
  bucket?: Bucket;
}