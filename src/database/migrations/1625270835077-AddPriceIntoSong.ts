import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddPriceIntoSong1625270835077
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'songs',
      new TableColumn({
        name: 'price',
        type: 'integer',
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('songs', 'price');
  }
}
