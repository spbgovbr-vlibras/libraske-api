import { DataSource, DataSourceOptions } from 'typeorm';

import environment from '../environment/environment';
import cliColors from '../utils/cliColors';

const isSqlite = environment.TYPEORM_CONNECTION === 'better-sqlite3';

const dataSourceOptions: DataSourceOptions = {
  name: environment.TYPEORM_CONNECTION_NAME,
  type: environment.TYPEORM_CONNECTION as any,
  database: environment.TYPEORM_DATABASE,
  entities: [
    environment.TYPEORM_ENTITIES,
    environment.TYPEORM_ENTITIES
  ? environment.TYPEORM_ENTITIES.replace('.ts', '.js')
  : 'dist/**/*.entity.js'
  ],
  migrations: [environment.TYPEORM_MIGRATIONS],
  logging: environment.TYPEORM_LOGGING === 'true',
  synchronize: environment.TYPEORM_SYNCHRONIZE === 'true',
  ...(isSqlite
    ? {}
    : {
        host: environment.TYPEORM_HOST,
        port: environment.TYPEORM_PORT ? Number(environment.TYPEORM_PORT) : undefined,
        username: environment.TYPEORM_USERNAME,
        password: environment.TYPEORM_PASSWORD,
      }),
};

console.log({ options: dataSourceOptions });

export const AppDataSource = new DataSource(dataSourceOptions);

export const startDatabase = async (): Promise<void> => {
  console.log(cliColors.white(`Starting database connection...`));

  try {
    if (AppDataSource.isInitialized) {
      console.log(cliColors.yellow(`Data Source already initialized.`));
      return;
    }

    await AppDataSource.initialize();
    console.log(cliColors.green(`Data Source has been initialized successfully!`));
    if (AppDataSource.isInitialized) {
      console.log(cliColors.green(`Database started!`));
    }
  } catch (error) {
    console.error(cliColors.red(`Error during Data Source initialization:`), error);
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
