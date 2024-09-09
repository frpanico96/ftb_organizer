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

  afterEach(() => {
    jest.clearAllMocks();

    evt.httpMethod = '';
    evt.queryStringParameters = '';
    process.env.TABLE_NAME = '';
  });


  it('Get existing Device', async () => {

    jest.spyOn(ddbClient, 'send').mockImplementation(async () => {
      return Promise.resolve(existingDevice);
    });

    process.env.TABLE_NAME = 'testDB';
    evt.httpMethod = 'GET';
    evt.queryStringParameters = {'device_id': 'testDevice'};

    const result: APIGatewayProxyResult = await getDevice(ddbClient, evt);

    //console.log('GetExistingDevice result:', result);

    expect(result.statusCode).toBe(200);
    expect(result.body).toContain('device_id');

  });

  it('Get new Device', async () => {

    jest.spyOn(ddbClient, 'send').mockImplementation(async () => {
      return Promise.resolve({Item: undefined});
    });

    process.env.TABLE_NAME = 'testDB';
    evt.httpMethod = 'GET';
    evt.queryStringParameters = {'device_id': 'testDevice'};

    const result: APIGatewayProxyResult = await getDevice(ddbClient, evt);

    console.log('GetNewDevice result:', result);

    expect(result.statusCode).toBe(200);
    expect(result.body).toContain('device');

  });


  it('No table name', async () => {

    process.env.TABLE_NAME = '';

    evt.httpMethod = 'GET';
    evt.queryStringParameters = {'device_id': 'testDevice'};
  
    const result: APIGatewayProxyResult = await getDevice(ddbClient, evt);

    //console.log('GetExistingDevice result:', result);

    expect(result.statusCode).toBe(502);
    expect(result.body).toContain('DB');

  });

  it('No query string params', async () => {

    process.env.TABLE_NAME = 'testDB';

    const result: APIGatewayProxyResult = await getDevice(ddbClient, evt);

    //console.log('GetExistingDevice result:', result);

    expect(result.statusCode).toBe(502);
    expect(result.body).toContain('parameter');

  });

  it('No query string param device_id', async () => {

    process.env.TABLE_NAME = 'testDB';
    evt.httpMethod = 'GET';
    evt.queryStringParameters = {'hello': 'testDevice'};

    const result: APIGatewayProxyResult = await getDevice(ddbClient, evt);

    //console.log('GetExistingDevice result:', result);

    expect(result.statusCode).toBe(502);
    expect(result.body).toContain('device_id');

  });

})