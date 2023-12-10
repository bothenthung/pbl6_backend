import { MigrationInterface, QueryRunner } from "typeorm";

export class RefactorDatabase1702113313037 implements MigrationInterface {
    name = 'RefactorDatabase1702113313037'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_11be1d9d8e306f676ddab8ae28d\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_7dd34f02011e6c06055dd369cff\``);
        await queryRunner.query(`CREATE TABLE \`user_project\` (\`id\` varchar(36) NOT NULL, \`userID\` varchar(255) NOT NULL, \`projectID\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`projectProjectID\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`userUserID\``);
        await queryRunner.query(`ALTER TABLE \`message\` ADD \`userSendId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD \`userReceiveId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD \`projectID\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_da0d45052bc72b5e2149aad0bab\` FOREIGN KEY (\`userSendId\`) REFERENCES \`user\`(\`userID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_1d78cd2aadea77d84602a69ba12\` FOREIGN KEY (\`userReceiveId\`) REFERENCES \`user\`(\`userID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_09dd0f3f7f13078d92b4574b4b5\` FOREIGN KEY (\`projectID\`) REFERENCES \`project\`(\`projectID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_project\` ADD CONSTRAINT \`FK_87adf2d9e910cdf3742b1a982ab\` FOREIGN KEY (\`userID\`) REFERENCES \`user\`(\`userID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_project\` ADD CONSTRAINT \`FK_c60fe96936992ef3504af66b738\` FOREIGN KEY (\`projectID\`) REFERENCES \`project\`(\`projectID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_project\` DROP FOREIGN KEY \`FK_c60fe96936992ef3504af66b738\``);
        await queryRunner.query(`ALTER TABLE \`user_project\` DROP FOREIGN KEY \`FK_87adf2d9e910cdf3742b1a982ab\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_09dd0f3f7f13078d92b4574b4b5\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_1d78cd2aadea77d84602a69ba12\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_da0d45052bc72b5e2149aad0bab\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`projectID\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`userReceiveId\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`userSendId\``);
        await queryRunner.query(`ALTER TABLE \`message\` ADD \`userUserID\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD \`projectProjectID\` varchar(36) NULL`);
        await queryRunner.query(`DROP TABLE \`user_project\``);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_7dd34f02011e6c06055dd369cff\` FOREIGN KEY (\`userUserID\`) REFERENCES \`user\`(\`userID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_11be1d9d8e306f676ddab8ae28d\` FOREIGN KEY (\`projectProjectID\`) REFERENCES \`project\`(\`projectID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
