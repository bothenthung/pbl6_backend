"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const message_entity_1 = require("./message.entity");
const task_entity_1 = require("./task.entity");
const userProject_entity_1 = require("./userProject.entity");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], User.prototype, "userID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "publicKey", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => task_entity_1.Task, (task) => task.user),
    __metadata("design:type", Array)
], User.prototype, "tasks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_entity_1.MessageEntity, (message) => message.userSend),
    __metadata("design:type", Array)
], User.prototype, "sendMessages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_entity_1.MessageEntity, (message) => message.userReceive),
    __metadata("design:type", Array)
], User.prototype, "receiveMessages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => userProject_entity_1.UserProject, (userProject) => userProject.user),
    __metadata("design:type", Array)
], User.prototype, "userProjects", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)("user")
], User);
