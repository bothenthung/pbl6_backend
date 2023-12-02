import { MigrationInterface, QueryRunner } from "typeorm";

export class TransformColumnName1701416169318 implements MigrationInterface {
    name = 'TransformColumnName1701416169318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_11be1d9d8e306f676ddab8ae28d\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_7dd34f02011e6c06055dd369cff\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`projectProjectID\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`userUserID\``);
        await queryRunner.query(`ALTER TABLE \`message\` ADD \`userID\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD \`projectID\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_5c71f2689991a90f2c0e8cf2a26\` FOREIGN KEY (\`userID\`) REFERENCES \`user\`(\`userID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_09dd0f3f7f13078d92b4574b4b5\` FOREIGN KEY (\`projectID\`) REFERENCES \`project\`(\`projectID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_09dd0f3f7f13078d92b4574b4b5\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_5c71f2689991a90f2c0e8cf2a26\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`projectID\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`userID\``);
        await queryRunner.query(`ALTER TABLE \`message\` ADD \`userUserID\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD \`projectProjectID\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_7dd34f02011e6c06055dd369cff\` FOREIGN KEY (\`userUserID\`) REFERENCES \`user\`(\`userID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_11be1d9d8e306f676ddab8ae28d\` FOREIGN KEY (\`projectProjectID\`) REFERENCES \`project\`(\`projectID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
