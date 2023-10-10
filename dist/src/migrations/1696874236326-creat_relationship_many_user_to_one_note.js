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
exports.CreatRelationshipManyUserToOneNote1696874236326 = void 0;
class CreatRelationshipManyUserToOneNote1696874236326 {
    constructor() {
        this.name = 'CreatRelationshipManyUserToOneNote1696874236326';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`note\` ADD \`userUserID\` int NULL`);
            yield queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`refreshToken\``);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD \`refreshToken\` varchar(255) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`publicKey\``);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD \`publicKey\` varchar(255) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE \`note\` ADD CONSTRAINT \`FK_287235a9de38df217b3e1f86fc8\` FOREIGN KEY (\`userUserID\`) REFERENCES \`user\`(\`userID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`note\` DROP FOREIGN KEY \`FK_287235a9de38df217b3e1f86fc8\``);
            yield queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`publicKey\``);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD \`publicKey\` text NULL`);
            yield queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`refreshToken\``);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD \`refreshToken\` text NULL`);
            yield queryRunner.query(`ALTER TABLE \`note\` DROP COLUMN \`userUserID\``);
        });
    }
}
exports.CreatRelationshipManyUserToOneNote1696874236326 = CreatRelationshipManyUserToOneNote1696874236326;
