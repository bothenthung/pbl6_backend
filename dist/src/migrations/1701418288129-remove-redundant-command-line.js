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
exports.RemoveRedundantCommandLine1701418288129 = void 0;
class RemoveRedundantCommandLine1701418288129 {
    constructor() {
        this.name = 'RemoveRedundantCommandLine1701418288129';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_09dd0f3f7f13078d92b4574b4b5\``);
            yield queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_5c71f2689991a90f2c0e8cf2a26\``);
            yield queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`projectID\``);
            yield queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`userID\``);
            yield queryRunner.query(`ALTER TABLE \`message\` ADD \`userUserID\` varchar(36) NULL`);
            yield queryRunner.query(`ALTER TABLE \`message\` ADD \`projectProjectID\` varchar(36) NULL`);
            yield queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_7dd34f02011e6c06055dd369cff\` FOREIGN KEY (\`userUserID\`) REFERENCES \`user\`(\`userID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_11be1d9d8e306f676ddab8ae28d\` FOREIGN KEY (\`projectProjectID\`) REFERENCES \`project\`(\`projectID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_11be1d9d8e306f676ddab8ae28d\``);
            yield queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_7dd34f02011e6c06055dd369cff\``);
            yield queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`projectProjectID\``);
            yield queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`userUserID\``);
            yield queryRunner.query(`ALTER TABLE \`message\` ADD \`userID\` varchar(36) NULL`);
            yield queryRunner.query(`ALTER TABLE \`message\` ADD \`projectID\` varchar(36) NULL`);
            yield queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_5c71f2689991a90f2c0e8cf2a26\` FOREIGN KEY (\`userID\`) REFERENCES \`user\`(\`userID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_09dd0f3f7f13078d92b4574b4b5\` FOREIGN KEY (\`projectID\`) REFERENCES \`project\`(\`projectID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.RemoveRedundantCommandLine1701418288129 = RemoveRedundantCommandLine1701418288129;
