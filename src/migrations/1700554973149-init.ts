import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1700554973149 implements MigrationInterface {
    name = 'Init1700554973149'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`userID\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`userName\` varchar(255) NOT NULL, \`password\` text NOT NULL, \`refreshToken\` text NULL, \`publicKey\` text NULL, PRIMARY KEY (\`userID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project\` (\`projectID\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`projectID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project_users_user\` (\`projectProjectID\` varchar(36) NOT NULL, \`userUserID\` varchar(36) NOT NULL, INDEX \`IDX_7f204ecaffba937eb3e1da39be\` (\`projectProjectID\`), INDEX \`IDX_d3f270021a3153c08cecd16424\` (\`userUserID\`), PRIMARY KEY (\`projectProjectID\`, \`userUserID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`project_users_user\` ADD CONSTRAINT \`FK_7f204ecaffba937eb3e1da39be0\` FOREIGN KEY (\`projectProjectID\`) REFERENCES \`project\`(\`projectID\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`project_users_user\` ADD CONSTRAINT \`FK_d3f270021a3153c08cecd164246\` FOREIGN KEY (\`userUserID\`) REFERENCES \`user\`(\`userID\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project_users_user\` DROP FOREIGN KEY \`FK_d3f270021a3153c08cecd164246\``);
        await queryRunner.query(`ALTER TABLE \`project_users_user\` DROP FOREIGN KEY \`FK_7f204ecaffba937eb3e1da39be0\``);
        await queryRunner.query(`DROP INDEX \`IDX_d3f270021a3153c08cecd16424\` ON \`project_users_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_7f204ecaffba937eb3e1da39be\` ON \`project_users_user\``);
        await queryRunner.query(`DROP TABLE \`project_users_user\``);
        await queryRunner.query(`DROP TABLE \`project\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
