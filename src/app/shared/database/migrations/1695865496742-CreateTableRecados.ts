import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableRecados1695865496742 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
          {
            name: "id_usuario",
            type: "uuid",
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["id_usuario"],
            referencedColumnNames: ["id"],
            referencedTableName: "usuarios",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("recados", true, true, true);
  }
}
