import chalk from 'chalk';
import { ConnectionOptions, createConnection } from 'typeorm';

import environment from '../environment/environment';

const options = {
  name: environment.TYPEORM_CONNECTION_NAME,
  type: environment.TYPEORM_CONNECTION,
  host: environment.TYPEORM_HOST,
  port: environment.TYPEORM_PORT,
  username: environment.TYPEORM_USERNAME,
  password: environment.TYPEORM_PASSWORD,
  database: environment.TYPEORM_DATABASE,
  entities: [environment.TYPEORM_ENTITIES],
  migrations: [environment.TYPEORM_MIGRATIONS],
  cli: {
    migrationsDir: environment.TYPEORM_MIGRATIONS_DIR,
  },
  logging: environment.TYPEORM_LOGGING === 'true',
  synchronize: environment.TYPEORM_SYNCHRONIZE === 'true'
} as ConnectionOptions;

export const startDatabase = async (): Promise<void> => {
  console.log(chalk.white(`Starting database...`));

  await createConnection(options);

  console.log(chalk.green(`Database started!`));
};
