"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableUsuarios1696215126398 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableUsuarios1696215126398 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "usuarios",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isNullable: false,
                    isPrimary: true,
                    default: "uuid_generate_v4()",
                },
                {
                    name: "email",
                    type: "varchar",
                    length: "150",
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name: "nome",
                    type: "varchar",
                    length: "255",
                    isNullable: false,
                },
                {
                    name: "senha",
                    type: "varchar",
                    length: "255",
                    isNullable: false,
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("usuarios", true, true, true);
    }
}
exports.CreateTableUsuarios1696215126398 = CreateTableUsuarios1696215126398;
