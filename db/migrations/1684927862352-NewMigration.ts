import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigration1684927862352 implements MigrationInterface {
  name = 'NewMigration1684927862352';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('create table score(id int,point int)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('drop table score');
  }
}
