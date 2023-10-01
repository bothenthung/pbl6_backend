import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateNoteEntity1695839377338 implements MigrationInterface {
    name = 'UpdateNoteEntity1695839377338'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`note\` (\`fileID\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, \`created_at\` varchar(255) NOT NULL, PRIMARY KEY (\`fileID\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`note\``);
    }

}
