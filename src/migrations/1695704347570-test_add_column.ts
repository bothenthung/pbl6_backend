import { MigrationInterface, QueryRunner } from "typeorm";

export class TestAddColumn1695704347570 implements MigrationInterface {
    name = 'TestAddColumn1695704347570'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`refreshTokennn\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`refreshTokennn\``);
    }

}
