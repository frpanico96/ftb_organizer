
import { DeviceDto } from "../../../lib/src/utils/dto"
import { handler } from "../../../lib/src/devicesLambda/handler"
import { APIGatewayProxyResult } from "aws-lambda"

const deviceDto: DeviceDto = {
  device_id: 'testDevice',
}

//Mock dynamoDb client
jest.mock('@aws-sdk/client-dynamodb', () => ({
  ...jest.requireActual('@aws-sdk/client-dynamodb'),
  DynamoDBClient: jest.fn().mockImplementation(() => {
    return {
      send: jest.fn().mockImplementation(async () => {
        return Promise.resolve({Item: undefined});
      })
    }
  }),
}));

describe('Device handler suite', () => {

  let evt = {
    queryStringParameters: {},
    httpMethod: '',
  }

  // beforeEach(() => {
  // })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('create new device', async () => {

    process.env.TABLE_NAME = 'testDB';
    evt.httpMethod = 'GET';
    evt.queryStringParameters = {'device_id': 'testDevice'};


    const result: APIGatewayProxyResult = await handler(evt, {} as any, () => {});

    console.log(result);

    expect(result.statusCode).toBe(200);
    expect(result.body).toContain('device');

  })

});