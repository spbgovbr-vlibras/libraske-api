import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableUnique,
} from 'typeorm';

export default class CreateBoughtItems1625271140873
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'boughtSongs',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'int',
          },
          {
            name: 'song_id',
            type: 'uuid',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'boughtSongs',
      new TableForeignKey({
        name: 'SongsBoughtUser',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: "CASCADE"
      }),
    );

    await queryRunner.createForeignKey(
      'boughtSongs',
      new TableForeignKey({
        name: 'SongsBought',
        columnNames: ['song_id'],
        referencedTableName: 'songs',
        referencedColumnNames: ['id'],
      }),
    );

    await queryRunner.createUniqueConstraint('boughtSongs', new TableUnique(
      { name: 'UQ_boughtSongs_song_id_user_id', columnNames: ['song_id', 'user_id'] }
    ))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint('boughtSongs', 'UQ_boughtSongs_song_id_user_id');
    await queryRunner.dropForeignKey('boughtSongs', 'SongsBought');
    await queryRunner.dropForeignKey('boughtSongs', 'SongsBoughtUser');
    await queryRunner.dropTable('boughtSongs');
  }
}
