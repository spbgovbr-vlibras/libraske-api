import 'reflect-metadata';

import cliColors from '../utils/cliColors';
import { AppDataSource } from '../database';

async function bootstrap() {
  console.log(cliColors.white('Bootstrapping API instance...'));

  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  console.log(cliColors.white('Running pending migrations...'));
  await AppDataSource.runMigrations();
  console.log(cliColors.green('Migrations finished.'));

  console.log(cliColors.white('Executing database seed (idempotent)...'));
  await import('../database/seeds/DatabaseSeed');
  console.log(cliColors.green('Seed completed.'));

  console.log(cliColors.white('Starting HTTP server...'));
  await import('../server');
}

bootstrap().catch((error) => {
  console.error(cliColors.red('Bootstrap failed'), error);
  process.exit(1);
});
