import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateScore1625277636823 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'scores',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'game_session_id',
            type: 'int',
            isUnique: true,
          },
          {
            name: 'session_score',
            type: 'integer',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'scores',
      new TableForeignKey({
        name: 'GameSessionScore',
        columnNames: ['game_session_id'],
        referencedTableName: 'game_sessions',
        referencedColumnNames: ['id'],
        onDelete: "CASCADE"
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('scores', 'GameSessionScore');
    await queryRunner.dropTable('scores');
  }
}
