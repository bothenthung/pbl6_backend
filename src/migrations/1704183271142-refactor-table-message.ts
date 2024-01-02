import { MigrationInterface, QueryRunner } from "typeorm";

export class RefactorTableMessage1704183271142 implements MigrationInterface {
    name = 'RefactorTableMessage1704183271142'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`messages\` ADD \`receiverId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_acf951a58e3b9611dd96ce89042\` FOREIGN KEY (\`receiverId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_acf951a58e3b9611dd96ce89042\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP COLUMN \`receiverId\``);
    }

}
