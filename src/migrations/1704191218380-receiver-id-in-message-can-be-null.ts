import { MigrationInterface, QueryRunner } from "typeorm";

export class ReceiverIdInMessageCanBeNull1704191218380 implements MigrationInterface {
    name = 'ReceiverIdInMessageCanBeNull1704191218380'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`messages\` CHANGE \`receiver_id\` \`receiver_id\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`messages\` CHANGE \`receiver_id\` \`receiver_id\` varchar(255) NOT NULL`);
    }

}
