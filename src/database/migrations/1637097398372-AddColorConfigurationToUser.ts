import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColorConfigurationToUser1637097398372 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const colorConfiguration = {
      "pele": null,
      "olhos": null,
      "cabelo": null,
      "camisa": null,
      "calca": null,
    }

    await queryRunner.addColumn('users',
      new TableColumn({
        name: "pele",
        type: "varchar",
        default: null,
        isNullable: true
      }))
    await queryRunner.addColumn('users',
      new TableColumn({
        name: "olhos",
        type: "varchar",
        default: null,
        isNullable: true
      }))
    await queryRunner.addColumn('users',
      new TableColumn({
        name: "cabelo",
        type: "varchar",
        default: null,
        isNullable: true
      }))
    await queryRunner.addColumn('users',
      new TableColumn({
        name: "camisa",
        type: "varchar",
        default: null,
        isNullable: true
      }))
    await queryRunner.addColumn('users',
      new TableColumn({
        name: "calca",
        type: "varchar",
        default: null,
        isNullable: true
      }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'pele');
    await queryRunner.dropColumn('users', 'olhos');
    await queryRunner.dropColumn('users', 'cabelo');
    await queryRunner.dropColumn('users', 'camisa');
    await queryRunner.dropColumn('users', 'calca');
  }

}
