import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1697701630851 implements MigrationInterface {
    name = 'Init1697701630851'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`note\` (\`noteID\` int NOT NULL AUTO_INCREMENT, \`title\` text NOT NULL, \`content\` text NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userID\` int NULL, PRIMARY KEY (\`noteID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`userID\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`userName\` varchar(255) NOT NULL, \`password\` text NOT NULL, \`refreshToken\` text NULL, \`publicKey\` text NULL, PRIMARY KEY (\`userID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`note\` ADD CONSTRAINT \`FK_77cf96c0ddf6d031a30224a2291\` FOREIGN KEY (\`userID\`) REFERENCES \`user\`(\`userID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`note\` DROP FOREIGN KEY \`FK_77cf96c0ddf6d031a30224a2291\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`note\``);
    }

}
