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
exports.InvitationEntity = exports.InvitationStatus = void 0;
const typeorm_1 = require("typeorm");
const baseEntity_1 = require("../types/baseEntity");
const project_entity_1 = require("./project.entity");
const user_entity_1 = require("./user.entity");
var InvitationStatus;
(function (InvitationStatus) {
    InvitationStatus["Accepted"] = "accepted";
    InvitationStatus["Pending"] = "pending";
    InvitationStatus["Reject"] = "reject";
})(InvitationStatus || (exports.InvitationStatus = InvitationStatus = {}));
let InvitationEntity = class InvitationEntity extends baseEntity_1.BaseEntity {
};
exports.InvitationEntity = InvitationEntity;
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], InvitationEntity.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: false }),
    __metadata("design:type", String)
], InvitationEntity.prototype, "userSendId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], InvitationEntity.prototype, "userReceiveId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: false }),
    __metadata("design:type", String)
], InvitationEntity.prototype, "projectID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.sendInvitations),
    (0, typeorm_1.JoinColumn)({ name: "userSendId", referencedColumnName: 'userID' }),
    __metadata("design:type", user_entity_1.User)
], InvitationEntity.prototype, "userSend", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.receiveInvitations),
    (0, typeorm_1.JoinColumn)({ name: "userReceiveId", referencedColumnName: 'userID' }),
    __metadata("design:type", user_entity_1.User)
], InvitationEntity.prototype, "userReceive", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.Project, (project) => project.userProjects),
    (0, typeorm_1.JoinColumn)({ name: "projectID", referencedColumnName: 'projectID' }),
    __metadata("design:type", project_entity_1.Project)
], InvitationEntity.prototype, "project", void 0);
exports.InvitationEntity = InvitationEntity = __decorate([
    (0, typeorm_1.Entity)("invitation")
], InvitationEntity);
