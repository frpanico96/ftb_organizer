import { DynamoDBClient, GetItemCommand, GetItemCommandInput, GetItemCommandOutput, PutItemCommand, PutItemCommandInput, PutItemCommandOutput } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { BodyResponse } from "../../utils/interfaces";
import { DeviceDto } from "../../utils/dto";

/**
 * 
 * @param ddbClient - dynamodb connection 
 * @param event - api gateway event
 * 
 * @description
 * checks if the device is already registered
 * if not present
 * checks again maximum device limit
 * register the device
 * 
 * @returns
 * the device name
 */
export const getDevice: Function = async (ddbClient: DynamoDBClient, event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  let bodyRes: BodyResponse = {
    status: 'success',
    message: '',
  };

  try{

    if(!process.env.TABLE_NAME) throw new Error('Internal server error: Cannot locate DB');

    if(!event.queryStringParameters) throw new Error('No parameter provided');
    
    if(!('device_id' in event.queryStringParameters) || !(event.queryStringParameters['device_id'])) throw new Error('no device_id provided');

    const tableName: string = process.env.TABLE_NAME;
    const deviceId: string = event.queryStringParameters['device_id'];

    const getCommandInput: GetItemCommandInput = {
      TableName: tableName,
      Key: marshall({device_id: deviceId})
    }

    const getCommand: GetItemCommand = new GetItemCommand(getCommandInput);

    const getDevice: GetItemCommandOutput = await ddbClient.send(getCommand);

    console.log('GetDevice', getDevice);

    if(getDevice.Item){
      const device = unmarshall(getDevice.Item);

      bodyRes.message = JSON.stringify({device: device});
    } else {

      const newDevice: DeviceDto = {
        device_id: deviceId,
      };

      const putCommandInput: PutItemCommandInput = {
        TableName: tableName,
        Item: marshall(newDevice),
      };

      const putCommand: PutItemCommand = new PutItemCommand(putCommandInput);

      const device: PutItemCommandOutput = await ddbClient.send(putCommand)

      bodyRes.message = JSON.stringify({device: device});

    }

  }catch(error){

    bodyRes.status = 'failed';
    bodyRes.message = (error as Error)?.message;
    return {
      statusCode: 502,
      body: JSON.stringify(bodyRes),
    }
  }


  return {
    statusCode: 200,
    body: JSON.stringify(bodyRes),
  }

}