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
exports.CreateColumnEntity1700591350034 = void 0;
class CreateColumnEntity1700591350034 {
    constructor() {
        this.name = 'CreateColumnEntity1700591350034';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE \`columns\` (\`columnID\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`index\` int NOT NULL, \`projectID\` varchar(36) NULL, PRIMARY KEY (\`columnID\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`ALTER TABLE \`columns\` ADD CONSTRAINT \`FK_6dd7f69e4172739740123b4458f\` FOREIGN KEY (\`projectID\`) REFERENCES \`project\`(\`projectID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`columns\` DROP FOREIGN KEY \`FK_6dd7f69e4172739740123b4458f\``);
            yield queryRunner.query(`DROP TABLE \`columns\``);
        });
    }
}
exports.CreateColumnEntity1700591350034 = CreateColumnEntity1700591350034;
