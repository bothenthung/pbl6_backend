import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMessageEntity1701406321165 implements MigrationInterface {
    name = 'CreateMessageEntity1701406321165'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`message\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` tinyint NOT NULL DEFAULT 0, \`message\` text NULL, \`userUserID\` varchar(36) NULL, \`projectProjectID\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_7dd34f02011e6c06055dd369cff\` FOREIGN KEY (\`userUserID\`) REFERENCES \`user\`(\`userID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_11be1d9d8e306f676ddab8ae28d\` FOREIGN KEY (\`projectProjectID\`) REFERENCES \`project\`(\`projectID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_11be1d9d8e306f676ddab8ae28d\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_7dd34f02011e6c06055dd369cff\``);
        await queryRunner.query(`DROP TABLE \`message\``);
    }

}
