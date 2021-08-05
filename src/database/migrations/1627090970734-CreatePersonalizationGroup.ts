import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePersonalizationGroup1627090970734 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.createTable(
      new Table({
        name: 'personalization_group',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            generationStrategy: 'increment',
            isGenerated: true
          },
          {
            name: 'name',
            type: 'text',
            isNullable: false
          },
          {
            name: "personalization_id",
            type: "integer"
          },
          {
            name: "price",
            type: "integer",
            isNullable: false
          }
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'personalization_group',
      new TableForeignKey({
        name: 'PersonalizationGroup',
        columnNames: ['personalization_id'],
        referencedTableName: 'personalizations',
        referencedColumnNames: ['id']
      }),
    );

  }

  public async down(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.dropForeignKey(
      'personalization_group',
      'PersonalizationGroup',
    );
    await queryRunner.dropTable('personalization_group');
  }

}
