"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Init1700554973149 = void 0;
class Init1700554973149 {
    constructor() {
        this.name = 'Init1700554973149';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE \`user\` (\`userID\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`userName\` varchar(255) NOT NULL, \`password\` text NOT NULL, \`refreshToken\` text NULL, \`publicKey\` text NULL, PRIMARY KEY (\`userID\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`CREATE TABLE \`project\` (\`projectID\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`projectID\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`CREATE TABLE \`project_users_user\` (\`projectProjectID\` varchar(36) NOT NULL, \`userUserID\` varchar(36) NOT NULL, INDEX \`IDX_7f204ecaffba937eb3e1da39be\` (\`projectProjectID\`), INDEX \`IDX_d3f270021a3153c08cecd16424\` (\`userUserID\`), PRIMARY KEY (\`projectProjectID\`, \`userUserID\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`ALTER TABLE \`project_users_user\` ADD CONSTRAINT \`FK_7f204ecaffba937eb3e1da39be0\` FOREIGN KEY (\`projectProjectID\`) REFERENCES \`project\`(\`projectID\`) ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE \`project_users_user\` ADD CONSTRAINT \`FK_d3f270021a3153c08cecd164246\` FOREIGN KEY (\`userUserID\`) REFERENCES \`user\`(\`userID\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`project_users_user\` DROP FOREIGN KEY \`FK_d3f270021a3153c08cecd164246\``);
            yield queryRunner.query(`ALTER TABLE \`project_users_user\` DROP FOREIGN KEY \`FK_7f204ecaffba937eb3e1da39be0\``);
            yield queryRunner.query(`DROP INDEX \`IDX_d3f270021a3153c08cecd16424\` ON \`project_users_user\``);
            yield queryRunner.query(`DROP INDEX \`IDX_7f204ecaffba937eb3e1da39be\` ON \`project_users_user\``);
            yield queryRunner.query(`DROP TABLE \`project_users_user\``);
            yield queryRunner.query(`DROP TABLE \`project\``);
            yield queryRunner.query(`DROP TABLE \`user\``);
        });
    }
}
exports.Init1700554973149 = Init1700554973149;
