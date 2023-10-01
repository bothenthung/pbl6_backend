import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNoteEntity1695839176784 implements MigrationInterface {
    name = 'AddNoteEntity1695839176784'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`id\` \`userID\` int NOT NULL AUTO_INCREMENT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`userID\` \`id\` int NOT NULL AUTO_INCREMENT`);
    }

}
