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
exports.Project = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const column_entity_1 = require("./column.entity");
const message_entity_1 = require("./message.entity");
const userProject_entity_1 = require("./userProject.entity");
let Project = class Project {
};
exports.Project = Project;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Project.prototype, "projectID", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Project.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, { eager: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Project.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => column_entity_1.Columns, (column) => column.project),
    __metadata("design:type", Array)
], Project.prototype, "columns", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => userProject_entity_1.UserProject, (userProject) => userProject.user),
    __metadata("design:type", Array)
], Project.prototype, "userProjects", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_entity_1.MessageEntity, message => message.project),
    __metadata("design:type", Array)
], Project.prototype, "messages", void 0);
exports.Project = Project = __decorate([
    (0, typeorm_1.Entity)("project")
], Project);
