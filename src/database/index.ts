import { ConnectionOptions, createConnection } from 'typeorm';
import environment from '../environment/environment';
import chalk from 'chalk';

const options = {
  "name": environment.DATABASE_NAME,
  "type": environment.DATABASE_TYPE,
  "host": environment.DATABASE_HOST,
  "port": environment.DATABASE_PORT,
  "username": environment.DATABASE_USERNAME,
  "password": environment.DATABASE_PASSWORD,
  "database": environment.DATABASE,
  "entities": [environment.DATABASE_ENTITIES],
  "migrations": [environment.MIGRATION_FILES],
  "cli": {
    "migrationsDir": environment.MIGRATION_DIRECTORY
  },
  "logging": environment.DATABASE_LOG === "true",
  "synchronize": true
} as ConnectionOptions;

export const startDatabase = async () => {
  console.log(chalk.white(`Starting database...`));
  
  await createConnection(options);

  console.log(chalk.green(`Database started!`));
}
