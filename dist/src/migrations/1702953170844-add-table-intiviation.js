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
exports.AddTableIntiviation1702953170844 = void 0;
class AddTableIntiviation1702953170844 {
    constructor() {
        this.name = 'AddTableIntiviation1702953170844';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE \`invitation\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` tinyint NOT NULL DEFAULT 0, \`message\` text NULL, \`userSendId\` varchar(255) NOT NULL, \`userReceiveId\` varchar(255) NULL, \`projectID\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`ALTER TABLE \`invitation\` ADD CONSTRAINT \`FK_94f545dd9e690e08e8f13d282f4\` FOREIGN KEY (\`userSendId\`) REFERENCES \`user\`(\`userID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE \`invitation\` ADD CONSTRAINT \`FK_23025673c907b45c696847aa401\` FOREIGN KEY (\`userReceiveId\`) REFERENCES \`user\`(\`userID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE \`invitation\` ADD CONSTRAINT \`FK_c1c5df0630359caa868de3f3c93\` FOREIGN KEY (\`projectID\`) REFERENCES \`project\`(\`projectID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`invitation\` DROP FOREIGN KEY \`FK_c1c5df0630359caa868de3f3c93\``);
            yield queryRunner.query(`ALTER TABLE \`invitation\` DROP FOREIGN KEY \`FK_23025673c907b45c696847aa401\``);
            yield queryRunner.query(`ALTER TABLE \`invitation\` DROP FOREIGN KEY \`FK_94f545dd9e690e08e8f13d282f4\``);
            yield queryRunner.query(`DROP TABLE \`invitation\``);
        });
    }
}
exports.AddTableIntiviation1702953170844 = AddTableIntiviation1702953170844;
