import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSongs1619113712810 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'songs',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true
          },
          {
            name: 'user_id',
            type: 'int',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'singers',
            type: 'varchar',
          },
          {
            name: 'thumbnail',
            type: 'varchar',
          },
          {
            name: 'subtitle',
            type: 'varchar',
          },
          {
            name: 'animation',
            type: "varchar"
          },
          {
            name: 'song',
            type: "varchar"
          },
          {
            name: 'trainingAnimation1',
            type: "varchar"
          },
          {
            name: 'trainingAnimation2',
            type: "varchar"
          },
          {
            name: 'trainingAnimation3',
            type: "varchar"
          },
          {
            name: 'trainingAnimation4',
            type: "varchar"
          },
          {
            name: 'trainingAnimation5',
            type: "varchar"
          },
          {
            name: 'trainingPhrase1',
            type: "varchar"
          },
          {
            name: 'trainingPhrase2',
            type: "varchar"
          },
          {
            name: 'trainingPhrase3',
            type: "varchar"
          },
          {
            name: 'trainingPhrase4',
            type: "varchar"
          },
          {
            name: 'trainingPhrase5',
            type: "varchar"
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('songs');
  }
}
