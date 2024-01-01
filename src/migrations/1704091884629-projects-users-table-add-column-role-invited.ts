import { MigrationInterface, QueryRunner } from "typeorm";

export class ProjectsUsersTableAddColumnRoleInvited1704091884629 implements MigrationInterface {
    name = 'ProjectsUsersTableAddColumnRoleInvited1704091884629'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`projects_users\` ADD \`roleInvited\` enum ('owner', 'admin', 'user', 'guest') NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`projects_users\` DROP COLUMN \`roleInvited\``);
    }

}
