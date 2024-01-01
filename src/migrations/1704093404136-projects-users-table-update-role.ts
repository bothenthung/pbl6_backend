import { MigrationInterface, QueryRunner } from "typeorm";

export class ProjectsUsersTableUpdateRole1704093404136 implements MigrationInterface {
    name = 'ProjectsUsersTableUpdateRole1704093404136'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`projects_users\` DROP FOREIGN KEY \`FK_69db3fe69cde18cd819c2d79200\``);
        await queryRunner.query(`ALTER TABLE \`projects_users\` DROP FOREIGN KEY \`FK_a5c762f4dc08418212c20674101\``);
        await queryRunner.query(`ALTER TABLE \`projects_users\` DROP COLUMN \`projectId\``);
        await queryRunner.query(`ALTER TABLE \`projects_users\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`projects_users\` ADD CONSTRAINT \`FK_b7d782db86a3dc1bd3b7eaed1fd\` FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`projects_users\` ADD CONSTRAINT \`FK_274bd757ae91379bf033a2daccd\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`projects_users\` DROP FOREIGN KEY \`FK_274bd757ae91379bf033a2daccd\``);
        await queryRunner.query(`ALTER TABLE \`projects_users\` DROP FOREIGN KEY \`FK_b7d782db86a3dc1bd3b7eaed1fd\``);
        await queryRunner.query(`ALTER TABLE \`projects_users\` ADD \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`projects_users\` ADD \`projectId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`projects_users\` ADD CONSTRAINT \`FK_a5c762f4dc08418212c20674101\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`projects_users\` ADD CONSTRAINT \`FK_69db3fe69cde18cd819c2d79200\` FOREIGN KEY (\`projectId\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
