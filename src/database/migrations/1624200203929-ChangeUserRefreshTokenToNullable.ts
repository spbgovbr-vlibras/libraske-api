import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
export default class ChangeUserRefreshTokenToNullable1624200203929 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'users',
      'refreshToken',
      new TableColumn({
        name: 'refreshToken',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'users',
      'refreshToken',
      new TableColumn({
        name: 'refreshToken',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }
}
