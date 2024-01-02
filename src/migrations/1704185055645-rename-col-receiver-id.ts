import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameColReceiverId1704185055645 implements MigrationInterface {
    name = 'RenameColReceiverId1704185055645'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`messages\` CHANGE \`reveiver_id\` \`receiver_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`notification\` CHANGE \`reveiver_id\` \`receiver_id\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification\` CHANGE \`receiver_id\` \`reveiver_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`messages\` CHANGE \`receiver_id\` \`reveiver_id\` varchar(255) NOT NULL`);
    }

}
