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
exports.CreateTaskEntity1700678432356 = void 0;
class CreateTaskEntity1700678432356 {
    constructor() {
        this.name = 'CreateTaskEntity1700678432356';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE \`task\` (\`taskID\` varchar(36) NOT NULL, \`title\` text NULL, \`description\` text NULL, \`index\` int NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deadline_date\` datetime NOT NULL, \`columnID\` varchar(36) NULL, \`userID\` varchar(36) NULL, PRIMARY KEY (\`taskID\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`ALTER TABLE \`project\` DROP COLUMN \`title\``);
            yield queryRunner.query(`ALTER TABLE \`project\` ADD \`title\` text NULL`);
            yield queryRunner.query(`ALTER TABLE \`columns\` DROP COLUMN \`title\``);
            yield queryRunner.query(`ALTER TABLE \`columns\` ADD \`title\` text NULL`);
            yield queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_376c28e21c23befa3a36c41b755\` FOREIGN KEY (\`columnID\`) REFERENCES \`columns\`(\`columnID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_12bdc7725a95de1a3b399b1755b\` FOREIGN KEY (\`userID\`) REFERENCES \`user\`(\`userID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_12bdc7725a95de1a3b399b1755b\``);
            yield queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_376c28e21c23befa3a36c41b755\``);
            yield queryRunner.query(`ALTER TABLE \`columns\` DROP COLUMN \`title\``);
            yield queryRunner.query(`ALTER TABLE \`columns\` ADD \`title\` varchar(255) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE \`project\` DROP COLUMN \`title\``);
            yield queryRunner.query(`ALTER TABLE \`project\` ADD \`title\` varchar(255) NOT NULL`);
            yield queryRunner.query(`DROP TABLE \`task\``);
        });
    }
}
exports.CreateTaskEntity1700678432356 = CreateTaskEntity1700678432356;
