import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateColumnEntity1700591350034 implements MigrationInterface {
    name = 'CreateColumnEntity1700591350034'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`columns\` (\`columnID\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`index\` int NOT NULL, \`projectID\` varchar(36) NULL, PRIMARY KEY (\`columnID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`columns\` ADD CONSTRAINT \`FK_6dd7f69e4172739740123b4458f\` FOREIGN KEY (\`projectID\`) REFERENCES \`project\`(\`projectID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`columns\` DROP FOREIGN KEY \`FK_6dd7f69e4172739740123b4458f\``);
        await queryRunner.query(`DROP TABLE \`columns\``);
    }

}
