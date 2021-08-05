import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePersonalizationColor1627090992623 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'personalization_color',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            generationStrategy: 'increment',
            isGenerated: true
          },
          {
            name: 'code',
            type: 'text',
            isNullable: false
          },
          {
            name: "personalization_group_id",
            type: "integer",
            isNullable: false
          },
          {
            name: "isDefault",
            type: "boolean"
          }
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'personalization_color',
      new TableForeignKey({
        name: 'PersonalizationColor',
        columnNames: ['personalization_group_id'],
        referencedTableName: 'personalization_group',
        referencedColumnNames: ['id']
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('personalization_color');
  }

}
