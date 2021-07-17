import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateBoughtClothes1625272366388 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'boughtPersonalization',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
            isGenerated: true,
          },
          {
            name: 'user_id',
            type: 'int',
          },
          {
            name: 'personalization_id',
            type: 'int',
          },
          {
            name: 'color',
            type: 'varchar',
          },
          {
            name: 'isActive',
            type: 'boolean',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'boughtPersonalization',
      new TableForeignKey({
        name: 'PersonalizationBoughtUser',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: "CASCADE"
      }),
    );

    await queryRunner.createForeignKey(
      'boughtPersonalization',
      new TableForeignKey({
        name: 'PersonalizationBought',
        columnNames: ['personalization_id'],
        referencedTableName: 'personalizations',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'boughtPersonalization',
      'PersonalizationBought',
    );
    await queryRunner.dropForeignKey(
      'boughtPersonalization',
      'PersonalizationBoughtUser',
    );
    await queryRunner.dropTable('boughtPersonalization');
  }
}
