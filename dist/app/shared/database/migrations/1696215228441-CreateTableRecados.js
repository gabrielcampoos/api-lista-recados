"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableRecados1696215228441 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableRecados1696215228441 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "recados",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isNullable: false,
                    isPrimary: true,
                    default: "uuid_generate_v4()",
                },
                {
                    name: "titulo",
                    type: "varchar",
                    length: "255",
                    isNullable: false,
                },
                {
                    name: "recado",
                    type: "varchar",
                    length: "255",
                    isNullable: false,
                },
                {
                    name: "criado_por",
                    type: "varchar",
                    length: "255",
                    isNullable: false,
                },
                {
                    name: "criado_em",
                    type: "timestamp",
                    isNullable: false,
                    default: "now()",
                },
                {
                    name: "arquivado",
                    type: "boolean",
                    isNullable: false,
                    default: false,
                },
            ],
            foreignKeys: [
                new typeorm_1.TableForeignKey({
                    columnNames: ["criado_por"],
                    referencedColumnNames: ["email"],
                    referencedTableName: "usuarios",
                    name: "fk_recados_criado_por",
                    onDelete: "CASCADE",
                }),
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("recados", true, true, true);
    }
}
exports.CreateTableRecados1696215228441 = CreateTableRecados1696215228441;
