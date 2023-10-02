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
exports.UsuarioEntity = void 0;
const crypto_1 = require("crypto");
const typeorm_1 = require("typeorm");
const recado_entity_1 = require("./recado.entity");
// PADRÃO => active records
// @Entity({ name: 'usuarios' })
// export class UsuarioEntity extends BaseEntity {
// 	@PrimaryColumn()
// 	id!: string;
// 	@Column({ unique: true, type: 'varchar', length: 150 })
// 	email!: string;
// 	@Column({ type: 'varchar', length: 255 })
// 	senha!: string;
// 	@Column({ name: 'criadoem' })
// 	criadoEm!: Date;
// 	@BeforeInsert()
// 	beforeInsert() {
// 		// this.id = randomUUID();
// 		this.criadoEm = new Date();
// 	}
// }
let UsuarioEntity = exports.UsuarioEntity = class UsuarioEntity {
    id;
    email;
    nome;
    senha;
    recados;
    beforeInsert() {
        this.id = (0, crypto_1.randomUUID)();
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], UsuarioEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UsuarioEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UsuarioEntity.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UsuarioEntity.prototype, "senha", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => recado_entity_1.RecadoEntity, (recado) => recado.usuario),
    __metadata("design:type", Array)
], UsuarioEntity.prototype, "recados", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsuarioEntity.prototype, "beforeInsert", null);
exports.UsuarioEntity = UsuarioEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "usuarios" })
], UsuarioEntity);
