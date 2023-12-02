import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTaskEntity1700678432356 implements MigrationInterface {
    name = 'CreateTaskEntity1700678432356'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`task\` (\`taskID\` varchar(36) NOT NULL, \`title\` text NULL, \`description\` text NULL, \`index\` int NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deadline_date\` datetime NOT NULL, \`columnID\` varchar(36) NULL, \`userID\` varchar(36) NULL, PRIMARY KEY (\`taskID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`project\` DROP COLUMN \`title\``);
        await queryRunner.query(`ALTER TABLE \`project\` ADD \`title\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`columns\` DROP COLUMN \`title\``);
        await queryRunner.query(`ALTER TABLE \`columns\` ADD \`title\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_376c28e21c23befa3a36c41b755\` FOREIGN KEY (\`columnID\`) REFERENCES \`columns\`(\`columnID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_12bdc7725a95de1a3b399b1755b\` FOREIGN KEY (\`userID\`) REFERENCES \`user\`(\`userID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_12bdc7725a95de1a3b399b1755b\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_376c28e21c23befa3a36c41b755\``);
        await queryRunner.query(`ALTER TABLE \`columns\` DROP COLUMN \`title\``);
        await queryRunner.query(`ALTER TABLE \`columns\` ADD \`title\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`project\` DROP COLUMN \`title\``);
        await queryRunner.query(`ALTER TABLE \`project\` ADD \`title\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP TABLE \`task\``);
    }

}
