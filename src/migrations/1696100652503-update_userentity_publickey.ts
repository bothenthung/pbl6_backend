import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserentityPublickey1696100652503 implements MigrationInterface {
    name = 'UpdateUserentityPublickey1696100652503'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`note\` CHANGE \`fileID\` \`noteID\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`publicKey\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`publicKey\``);
        await queryRunner.query(`ALTER TABLE \`note\` CHANGE \`noteID\` \`fileID\` int NOT NULL AUTO_INCREMENT`);
    }

}
