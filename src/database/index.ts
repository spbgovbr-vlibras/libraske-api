import chalk from 'chalk';
import { DataSource, DataSourceOptions } from 'typeorm';

import environment from '../environment/environment';

const dataSourceOptions: DataSourceOptions = {
  name: environment.TYPEORM_CONNECTION_NAME,
  type: environment.TYPEORM_CONNECTION as any,
  host: environment.TYPEORM_HOST,
  port: environment.TYPEORM_PORT as any,
  username: environment.TYPEORM_USERNAME,
  password: environment.TYPEORM_PASSWORD,
  database: environment.TYPEORM_DATABASE,
  entities: [
    environment.TYPEORM_ENTITIES,
    environment.TYPEORM_ENTITIES.replace('.ts', '.js'),
  ],
  migrations: [environment.TYPEORM_MIGRATIONS],
  logging: environment.TYPEORM_LOGGING === 'true',
  synchronize: environment.TYPEORM_SYNCHRONIZE === 'true',
};

console.log({ options: dataSourceOptions });

export const AppDataSource = new DataSource(dataSourceOptions);

export const startDatabase = async (): Promise<void> => {
  console.log(chalk.white(`Starting database connection...`));

  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log(
        chalk.green(`Data Source has been initialized successfully!`),
      );
    } else {
      console.log(chalk.yellow(`Data Source is already initialized.`));
    }

    if (AppDataSource.isInitialized) {
      console.log(chalk.green(`Database started!`));
    }
  } catch (error) {
    console.error(chalk.red(`Error during Data Source initialization:`), error);
    process.exit(1);
  }
};

export const isConnectionAlive = async () => {
  try {
    await AppDataSource.query('SELECT 1');
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
