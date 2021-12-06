import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddCpfIntoUser1622999698006 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'cpf',
        type: 'varchar',
        isNullable: false,
        isUnique: true,
        length: '11',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'cpf');
  }
}
