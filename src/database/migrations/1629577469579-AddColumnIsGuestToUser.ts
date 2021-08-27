import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnIsGuestToUser1629577469579 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('users',
      new TableColumn({
        name: "isGuest",
        type: "boolean",
        default: false,
        isNullable: false
      }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'isGuest');
  }

}
