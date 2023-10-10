import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatRelationshipManyUserToOneNote1696874236326 implements MigrationInterface {
    name = 'CreatRelationshipManyUserToOneNote1696874236326'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`note\` ADD \`userUserID\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`refreshToken\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`refreshToken\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`publicKey\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`publicKey\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`note\` ADD CONSTRAINT \`FK_287235a9de38df217b3e1f86fc8\` FOREIGN KEY (\`userUserID\`) REFERENCES \`user\`(\`userID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`note\` DROP FOREIGN KEY \`FK_287235a9de38df217b3e1f86fc8\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`publicKey\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`publicKey\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`refreshToken\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`refreshToken\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`note\` DROP COLUMN \`userUserID\``);
    }

}
