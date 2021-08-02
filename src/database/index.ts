import { ConnectionOptions, createConnection } from 'typeorm';
import environment from '../../environment/environment';
import chalk from 'chalk';

const options = {
  "name": environment.TYPEORM_CONNECTION_NAME,
  "type": environment.TYPEORM_CONNECTION,
  "host": environment.TYPEORM_HOST,
  "port": environment.TYPEORM_PORT,
  "username": environment.TYPEORM_USERNAME,
  "password": environment.TYPEORM_PASSWORD,
  "database": environment.TYPEORM_DATABASE,
  "entities": [environment.TYPEORM_ENTITIES],
  "migrations": [environment.TYPEORM_MIGRATIONS],
  "cli": {
    "migrationsDir": environment.TYPEORM_MIGRATIONS_DIR
  },
  "logging": environment.TYPEORM_LOGGING === "true",
  "synchronize": true
} as ConnectionOptions;


console.log({options});


export const startDatabase = async () => {
  console.log(chalk.white(`Starting database...`));
  
  await createConnection(options);

  console.log(chalk.green(`Database started!`));
}
