import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveTestColumn1695704875724 implements MigrationInterface {
    name = 'RemoveTestColumn1695704875724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`refreshTokennn\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`refreshTokennn\` varchar(255) NOT NULL`);
    }

}
