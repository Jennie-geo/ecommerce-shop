import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatePerson1725280530522 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "persons"
            ADD COLUMN "is_banned" BOOLEAN DEFAULT FALSE;
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "persons"
        DROP COLUMN "is_banned";
      `);
  }
}
