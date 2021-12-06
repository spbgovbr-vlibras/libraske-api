import { Column, MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class ChangePontuationTypeInGameSession1623714355493
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'game_sessions',
      'pontuation',
      new TableColumn({
        name: 'pontuation',
        type: 'integer',
        isArray: true,
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'game_sessions',
      'pontuation',
      new TableColumn({
        name: 'pontuation',
        type: 'integer',
        default: 0,
      }),
    );
  }
}
