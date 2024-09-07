import { APIGatewayProxyResult } from "aws-lambda";
import { getDevice } from "../../../../lib/src/devicesLambda/core/GetDevice";

const existingDevice = {
  Item: {
    'device_id': {
      'S': 'testDevice',
    }
  }
};

describe('GetDevice test suite', () => {

  const ddbClient = {
    send: jest.fn(),
  }

  let evt = {
    queryStringParameters: {},
    httpMethod: '',
  }

  it('Get existing Device', async () => {

    jest.spyOn(ddbClient, 'send').mockImplementation(async () => {
      return Promise.resolve(existingDevice);
    });

    process.env.TABLE_NAME = 'testDB';
    evt.httpMethod = 'GET';
    evt.queryStringParameters = {'device_id': 'testDevice'};

    const result: APIGatewayProxyResult = await getDevice(ddbClient, evt);

    console.log('GetExistingDevice result:', result);

    expect(result.statusCode).toBe(200);
    expect(result.body).toContain('device_id');

  })
})