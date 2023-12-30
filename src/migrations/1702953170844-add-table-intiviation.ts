import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTableIntiviation1702953170844 implements MigrationInterface {
    name = 'AddTableIntiviation1702953170844'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`invitation\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` tinyint NOT NULL DEFAULT 0, \`message\` text NULL, \`userSendId\` varchar(255) NOT NULL, \`userReceiveId\` varchar(255) NULL, \`projectID\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`invitation\` ADD CONSTRAINT \`FK_94f545dd9e690e08e8f13d282f4\` FOREIGN KEY (\`userSendId\`) REFERENCES \`user\`(\`userID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`invitation\` ADD CONSTRAINT \`FK_23025673c907b45c696847aa401\` FOREIGN KEY (\`userReceiveId\`) REFERENCES \`user\`(\`userID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`invitation\` ADD CONSTRAINT \`FK_c1c5df0630359caa868de3f3c93\` FOREIGN KEY (\`projectID\`) REFERENCES \`project\`(\`projectID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`invitation\` DROP FOREIGN KEY \`FK_c1c5df0630359caa868de3f3c93\``);
        await queryRunner.query(`ALTER TABLE \`invitation\` DROP FOREIGN KEY \`FK_23025673c907b45c696847aa401\``);
        await queryRunner.query(`ALTER TABLE \`invitation\` DROP FOREIGN KEY \`FK_94f545dd9e690e08e8f13d282f4\``);
        await queryRunner.query(`DROP TABLE \`invitation\``);
    }

}
