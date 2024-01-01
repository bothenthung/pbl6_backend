import { MigrationInterface, QueryRunner } from "typeorm";

export class ColumnTableJoinProjectId1704123388374 implements MigrationInterface {
    name = 'ColumnTableJoinProjectId1704123388374'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`columns\` DROP FOREIGN KEY \`FK_3f28d61a92b732bfb574c3b71a2\``);
        await queryRunner.query(`ALTER TABLE \`columns\` DROP COLUMN \`projectId\``);
        await queryRunner.query(`ALTER TABLE \`columns\` ADD CONSTRAINT \`FK_ad83764ca1d841f43830f93b787\` FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`columns\` DROP FOREIGN KEY \`FK_ad83764ca1d841f43830f93b787\``);
        await queryRunner.query(`ALTER TABLE \`columns\` ADD \`projectId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`columns\` ADD CONSTRAINT \`FK_3f28d61a92b732bfb574c3b71a2\` FOREIGN KEY (\`projectId\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
