import { query } from 'express';
import { TableColumn, MigrationInterface, QueryRunner } from 'typeorm';

export default class AddColumnClosedSession1623721893304
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'game_sessions',
      new TableColumn({
        name: 'isClosed',
        type: 'boolean',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('game_sessions', 'isClosed');
  }
}
