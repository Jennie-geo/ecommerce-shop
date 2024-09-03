import { MigrationInterface, QueryRunner } from 'typeorm';

export class Product1725101527877 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE "products" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR NOT NULL,
        "description" TEXT NOT NULL,
        "image" TEXT NOT NULL,
        "price" DECIMAL(10, 2) NOT NULL,
        "quantity" INTEGER NOT NULL,
        "status" VARCHAR CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')) DEFAULT 'PENDING',
        "person_id" INTEGER,  
        "admins_id" INTEGER,
        "created_at" TIMESTAMP DEFAULT now(),
        "updated_at" TIMESTAMP DEFAULT now()
    );
    `);
    await queryRunner.query(`
    ALTER TABLE "products"
    ADD CONSTRAINT "FK_persons" FOREIGN KEY ("person_id") REFERENCES "persons"("id") ON DELETE SET NULL;
    `);

    await queryRunner.query(`
    ALTER TABLE "products"
    ADD CONSTRAINT "FK_admins" FOREIGN KEY ("admins_id") REFERENCES "admins"("id") ON DELETE SET NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE "products" DROP CONSTRAINT "FK_persons";
    `);

    await queryRunner.query(`
    ALTER TABLE "products" DROP CONSTRAINT "FK_admins";
    `);

    await queryRunner.query(`
    DROP TABLE "products";
    `);
  }
}
