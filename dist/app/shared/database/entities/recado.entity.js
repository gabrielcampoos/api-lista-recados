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
exports.RecadoEntity = void 0;
const crypto_1 = require("crypto");
const typeorm_1 = require("typeorm");
const usuario_entity_1 = require("./usuario.entity");
let RecadoEntity = exports.RecadoEntity = class RecadoEntity {
    id;
    titulo;
    recado;
    criadoPor;
    criadoEm;
    arquivado;
    usuario;
    beforeInsert() {
        // o que deve ser feito antes de inserir um novo registro de transação
        this.id = (0, crypto_1.randomUUID)();
        this.criadoEm = new Date();
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: "uuid" }),
    __metadata("design:type", String)
], RecadoEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RecadoEntity.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RecadoEntity.prototype, "recado", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RecadoEntity.prototype, "criadoPor", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], RecadoEntity.prototype, "criadoEm", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], RecadoEntity.prototype, "arquivado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.UsuarioEntity, (usuario) => usuario.recados),
    (0, typeorm_1.JoinColumn)({
        name: "criado_por",
        referencedColumnName: "email",
    }),
    __metadata("design:type", usuario_entity_1.UsuarioEntity)
], RecadoEntity.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RecadoEntity.prototype, "beforeInsert", null);
exports.RecadoEntity = RecadoEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "recados" })
], RecadoEntity);
