import { EntityTarget, ObjectLiteral } from 'typeorm';
import { AppDataSource } from '../../database';

export async function initializeTestDatabase() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
}

export async function closeTestDatabase() {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
}

export async function clearDatabaseEntities(
  entities: EntityTarget<ObjectLiteral>[],
) {
  if (!AppDataSource.isInitialized) {
    return;
  }

  for (const entity of entities) {
    const repository = AppDataSource.getRepository(entity);
    await repository.clear();
  }
}
