import * as dotenv from 'dotenv';

dotenv.config();


export const GLOBALS = {
  AWS_REGION: process.env.AWS_REGION || 'us-west-1',
}


console.log('Globals', GLOBALS);