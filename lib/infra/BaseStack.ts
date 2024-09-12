import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { GLOBALS } from "../constants";


export class BaseStack extends Stack {


  constructor(scope: Construct, id: string, props?: StackProps){
    super(scope, id, {...props, env:{
      region: GLOBALS.AWS_REGION,
    }});
  }


}