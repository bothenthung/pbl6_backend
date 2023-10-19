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
exports.Init1697701630851 = void 0;
class Init1697701630851 {
    constructor() {
        this.name = 'Init1697701630851';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE \`note\` (\`noteID\` int NOT NULL AUTO_INCREMENT, \`title\` text NOT NULL, \`content\` text NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userID\` int NULL, PRIMARY KEY (\`noteID\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`CREATE TABLE \`user\` (\`userID\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`userName\` varchar(255) NOT NULL, \`password\` text NOT NULL, \`refreshToken\` text NULL, \`publicKey\` text NULL, PRIMARY KEY (\`userID\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`ALTER TABLE \`note\` ADD CONSTRAINT \`FK_77cf96c0ddf6d031a30224a2291\` FOREIGN KEY (\`userID\`) REFERENCES \`user\`(\`userID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`note\` DROP FOREIGN KEY \`FK_77cf96c0ddf6d031a30224a2291\``);
            yield queryRunner.query(`DROP TABLE \`user\``);
            yield queryRunner.query(`DROP TABLE \`note\``);
        });
    }
}
exports.Init1697701630851 = Init1697701630851;
