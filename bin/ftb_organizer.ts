#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { FtbOrganizerStack } from '../lib/ftb_organizer-stack';
import { GatewayStack } from '../lib/infra/stacks/apis/GatewayStack';
import { DevicesApiStack } from '../lib/infra/stacks/apis/DevicesApiStack';
import { DatabaseStack } from '../lib/infra/stacks/data/DatabaseStack';
import { DevicesLambdaStack } from '../lib/infra/stacks/lambdas/DevicesLambdaStack';
import { EventsLambdaStack } from '../lib/infra/stacks/lambdas/EventsLambdaStack';
import { ImagesLambdaStack } from '../lib/infra/stacks/lambdas/ImagesLambdaStack';

const app = new cdk.App();
// new FtbOrganizerStack(app, 'FtbOrganizerStack', {
//   /* If you don't specify 'env', this stack will be environment-agnostic.
//    * Account/Region-dependent features and context lookups will not work,
//    * but a single synthesized template can be deployed anywhere. */

//   /* Uncomment the next line to specialize this stack for the AWS Account
//    * and Region that are implied by the current CLI configuration. */
//   // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

//   /* Uncomment the next line if you know exactly what Account and Region you
//    * want to deploy the stack to. */
//   // env: { account: '123456789012', region: 'us-east-1' },

//   /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
// });

/* GateWay Definition */
const gatewayStack = new GatewayStack(app, 'GatewayStack');

/* Database Definition */
const databaseStack = new DatabaseStack(app, 'DatabaseStack');

/* Lambda Definition */
const devicesLambda = new DevicesLambdaStack(app, 'DeviceLambdaStack', {db: databaseStack.devicesDb});
const eventsLambda = new EventsLambdaStack(app, 'EventsLambdaStack', {db: databaseStack.eventsDb});
const imagesLambda = new ImagesLambdaStack(app, 'ImagesLambdaStack', {db: databaseStack.imagesDb});


/* Api Definition */
new DevicesApiStack(app, 'DeviceApiStack', {lambdaIntegration: devicesLambda.lambdaIntegration , restApi: gatewayStack.apiGateway });