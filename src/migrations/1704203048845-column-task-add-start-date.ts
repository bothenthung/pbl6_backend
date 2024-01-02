import { MigrationInterface, QueryRunner } from "typeorm";

export class ColumnTaskAddStartDate1704203048845 implements MigrationInterface {
    name = 'ColumnTaskAddStartDate1704203048845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` CHANGE \`end_date\` \`start_date\` timestamp NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` CHANGE \`start_date\` \`end_date\` timestamp NULL`);
    }

}
