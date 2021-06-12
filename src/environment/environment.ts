import dotenv from 'dotenv';
import path from 'path';

const loadEnvironments = function loadEnviromentsVariables() {

  if (process.env.NODE_ENV === 'dev') {
    const dotEnvFile = path.join(__dirname, `.env.${process.env.NODE_ENV}`);
    return dotenv.config({ path: dotEnvFile }).parsed;
  }

  return process.env;
};

const env = loadEnvironments();

export default env;
