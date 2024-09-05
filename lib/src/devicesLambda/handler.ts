import { APIGatewayProxyEvent, APIGatewayProxyResult, Context, Handler } from "aws-lambda";
import {DynamoDBClient} from '@aws-sdk/client-dynamodb';
import { getDevice } from "./core/GetDevice";


const ddbClient = new DynamoDBClient({})
/**
 * 
 * @param event 
 * @param context
 * 
 * @description
 * Device Lambda handler
 * register or retrieve a device
 *  
 * @returns
 * Stanard result from api gateway event
 */
export const handler: Handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {

  try {
    
    switch (event.httpMethod) {
      case 'GET':
        return getDevice(ddbClient, event);
      default:
        throw new Error('Unimplemented');
    }

  } catch (error) {

    const errorMessage: string = (error as Error)?.message;

    return {
      statusCode: 502,
      body: errorMessage,
    }

  }


}