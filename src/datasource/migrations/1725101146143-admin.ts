import { MigrationInterface, QueryRunner } from 'typeorm';
export class Admin1725101146143 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "admins" (
                "id" SERIAL PRIMARY KEY,
                "name" TEXT NOT NULL,
                "email" TEXT NOT NULL,
                "password" TEXT NOT NULL,
                "is_admin" BOOLEAN NOT NULL,
                "created_at" TIMESTAMP DEFAULT now(),
                "updated_at" TIMESTAMP DEFAULT now()
            );
        `);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE "admins";
    `);
  }
}
