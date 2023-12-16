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
exports.RefactorDatabase1702113313037 = void 0;
class RefactorDatabase1702113313037 {
    constructor() {
        this.name = 'RefactorDatabase1702113313037';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_11be1d9d8e306f676ddab8ae28d\``);
            yield queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_7dd34f02011e6c06055dd369cff\``);
            yield queryRunner.query(`CREATE TABLE \`user_project\` (\`id\` varchar(36) NOT NULL, \`userID\` varchar(255) NOT NULL, \`projectID\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`projectProjectID\``);
            yield queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`userUserID\``);
            yield queryRunner.query(`ALTER TABLE \`message\` ADD \`userSendId\` varchar(255) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE \`message\` ADD \`userReceiveId\` varchar(255) NULL`);
            yield queryRunner.query(`ALTER TABLE \`message\` ADD \`projectID\` varchar(255) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_da0d45052bc72b5e2149aad0bab\` FOREIGN KEY (\`userSendId\`) REFERENCES \`user\`(\`userID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_1d78cd2aadea77d84602a69ba12\` FOREIGN KEY (\`userReceiveId\`) REFERENCES \`user\`(\`userID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_09dd0f3f7f13078d92b4574b4b5\` FOREIGN KEY (\`projectID\`) REFERENCES \`project\`(\`projectID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE \`user_project\` ADD CONSTRAINT \`FK_87adf2d9e910cdf3742b1a982ab\` FOREIGN KEY (\`userID\`) REFERENCES \`user\`(\`userID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE \`user_project\` ADD CONSTRAINT \`FK_c60fe96936992ef3504af66b738\` FOREIGN KEY (\`projectID\`) REFERENCES \`project\`(\`projectID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`user_project\` DROP FOREIGN KEY \`FK_c60fe96936992ef3504af66b738\``);
            yield queryRunner.query(`ALTER TABLE \`user_project\` DROP FOREIGN KEY \`FK_87adf2d9e910cdf3742b1a982ab\``);
            yield queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_09dd0f3f7f13078d92b4574b4b5\``);
            yield queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_1d78cd2aadea77d84602a69ba12\``);
            yield queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_da0d45052bc72b5e2149aad0bab\``);
            yield queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`projectID\``);
            yield queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`userReceiveId\``);
            yield queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`userSendId\``);
            yield queryRunner.query(`ALTER TABLE \`message\` ADD \`userUserID\` varchar(36) NULL`);
            yield queryRunner.query(`ALTER TABLE \`message\` ADD \`projectProjectID\` varchar(36) NULL`);
            yield queryRunner.query(`DROP TABLE \`user_project\``);
            yield queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_7dd34f02011e6c06055dd369cff\` FOREIGN KEY (\`userUserID\`) REFERENCES \`user\`(\`userID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_11be1d9d8e306f676ddab8ae28d\` FOREIGN KEY (\`projectProjectID\`) REFERENCES \`project\`(\`projectID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.RefactorDatabase1702113313037 = RefactorDatabase1702113313037;
