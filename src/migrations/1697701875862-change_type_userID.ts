import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeTypeUserID1697701875862 implements MigrationInterface {
    name = 'ChangeTypeUserID1697701875862'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`note\` DROP FOREIGN KEY \`FK_77cf96c0ddf6d031a30224a2291\``);
        await queryRunner.query(`ALTER TABLE \`note\` DROP COLUMN \`userID\``);
        await queryRunner.query(`ALTER TABLE \`note\` ADD \`userID\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`userID\` \`userID\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`userID\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`userID\` varchar(36) NOT NULL PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`note\` ADD CONSTRAINT \`FK_77cf96c0ddf6d031a30224a2291\` FOREIGN KEY (\`userID\`) REFERENCES \`user\`(\`userID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`note\` DROP FOREIGN KEY \`FK_77cf96c0ddf6d031a30224a2291\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`userID\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`userID\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD PRIMARY KEY (\`userID\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`userID\` \`userID\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`note\` DROP COLUMN \`userID\``);
        await queryRunner.query(`ALTER TABLE \`note\` ADD \`userID\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`note\` ADD CONSTRAINT \`FK_77cf96c0ddf6d031a30224a2291\` FOREIGN KEY (\`userID\`) REFERENCES \`user\`(\`userID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
