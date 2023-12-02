import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumDescriptionProjectEntity1700800523039 implements MigrationInterface {
    name = 'AddColumDescriptionProjectEntity1700800523039'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project\` ADD \`description\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project\` DROP COLUMN \`description\``);
    }

}
