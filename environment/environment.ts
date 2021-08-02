import dotenv, { DotenvParseOutput } from 'dotenv';
import path from 'path';

export const loadEnvironments = function loadEnviromentsVariables(typeOfEnvironment: string): DotenvParseOutput {
 
  if (typeOfEnvironment === 'dev' || typeOfEnvironment === 'test') {
    const dotEnvFile = path.join(__dirname, `../.env.${typeOfEnvironment}`);

    console.log(dotEnvFile);
    

    return dotenv.config({ path: dotEnvFile }).parsed as DotenvParseOutput;
  }

  return process.env as DotenvParseOutput;
};

export default loadEnvironments(process.env.NODE_ENV as string);
