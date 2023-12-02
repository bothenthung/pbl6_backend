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
exports.MessageEntity = void 0;
const typeorm_1 = require("typeorm");
const baseEntity_1 = require("../types/baseEntity");
const project_entity_1 = require("./project.entity");
const user_entity_1 = require("./user.entity");
let MessageEntity = class MessageEntity extends baseEntity_1.BaseEntity {
};
exports.MessageEntity = MessageEntity;
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], MessageEntity.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.messages),
    __metadata("design:type", user_entity_1.User)
], MessageEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.Project, project => project.messages),
    __metadata("design:type", project_entity_1.Project)
], MessageEntity.prototype, "project", void 0);
exports.MessageEntity = MessageEntity = __decorate([
    (0, typeorm_1.Entity)("message")
], MessageEntity);
