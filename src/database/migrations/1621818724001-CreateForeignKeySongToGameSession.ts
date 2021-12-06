import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class CreateForeignKeySongToGameSession1621818724001
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'game_sessions',
      new TableForeignKey({
        name: 'SongGameSession',
        columnNames: ['song_id'],
        referencedTableName: 'songs',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('game_sessions', 'SongGameSession');
  }
}
