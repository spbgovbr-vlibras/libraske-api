import dotenv, { DotenvParseOutput } from 'dotenv';
import path from 'path';

export const loadEnvironments = function loadEnviromentsVariables(typeOfEnvironment: string): DotenvParseOutput {

  if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test') {
    const dotEnvFile = path.join(__dirname, `.env.${process.env.NODE_ENV}`);
    return dotenv.config({ path: dotEnvFile }).parsed as DotenvParseOutput;
  }

  return process.env as DotenvParseOutput;
};

export default loadEnvironments(process.env.NODE_ENV as string);
