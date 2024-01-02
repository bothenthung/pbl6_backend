import { MigrationInterface, QueryRunner } from "typeorm";

export class TaskTableJoinColumnId1704212456515 implements MigrationInterface {
    name = 'TaskTableJoinColumnId1704212456515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_0ecfe75e5bd731e00e634d70e5f\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP COLUMN \`columnId\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD CONSTRAINT \`FK_986f14173dba32448f3f3abb1c4\` FOREIGN KEY (\`column_id\`) REFERENCES \`columns\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_986f14173dba32448f3f3abb1c4\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD \`columnId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD CONSTRAINT \`FK_0ecfe75e5bd731e00e634d70e5f\` FOREIGN KEY (\`columnId\`) REFERENCES \`columns\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
