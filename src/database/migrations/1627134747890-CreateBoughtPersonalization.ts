import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
  } from 'typeorm';
  
  export class CreateBoughtPersonalization1627134747890 implements MigrationInterface {
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
              name: 'personalization_group_id',
              type: 'integer',
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
          columnNames: ['personalization_group_id'],
          referencedTableName: 'personalization_group',
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
  