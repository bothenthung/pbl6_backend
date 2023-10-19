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
exports.ChangeTypeUserID1697701875862 = void 0;
class ChangeTypeUserID1697701875862 {
    constructor() {
        this.name = 'ChangeTypeUserID1697701875862';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`note\` DROP FOREIGN KEY \`FK_77cf96c0ddf6d031a30224a2291\``);
            yield queryRunner.query(`ALTER TABLE \`note\` DROP COLUMN \`userID\``);
            yield queryRunner.query(`ALTER TABLE \`note\` ADD \`userID\` varchar(36) NULL`);
            yield queryRunner.query(`ALTER TABLE \`user\` CHANGE \`userID\` \`userID\` int NOT NULL`);
            yield queryRunner.query(`ALTER TABLE \`user\` DROP PRIMARY KEY`);
            yield queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`userID\``);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD \`userID\` varchar(36) NOT NULL PRIMARY KEY`);
            yield queryRunner.query(`ALTER TABLE \`note\` ADD CONSTRAINT \`FK_77cf96c0ddf6d031a30224a2291\` FOREIGN KEY (\`userID\`) REFERENCES \`user\`(\`userID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`note\` DROP FOREIGN KEY \`FK_77cf96c0ddf6d031a30224a2291\``);
            yield queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`userID\``);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD \`userID\` int NOT NULL AUTO_INCREMENT`);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD PRIMARY KEY (\`userID\`)`);
            yield queryRunner.query(`ALTER TABLE \`user\` CHANGE \`userID\` \`userID\` int NOT NULL AUTO_INCREMENT`);
            yield queryRunner.query(`ALTER TABLE \`note\` DROP COLUMN \`userID\``);
            yield queryRunner.query(`ALTER TABLE \`note\` ADD \`userID\` int NULL`);
            yield queryRunner.query(`ALTER TABLE \`note\` ADD CONSTRAINT \`FK_77cf96c0ddf6d031a30224a2291\` FOREIGN KEY (\`userID\`) REFERENCES \`user\`(\`userID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.ChangeTypeUserID1697701875862 = ChangeTypeUserID1697701875862;
