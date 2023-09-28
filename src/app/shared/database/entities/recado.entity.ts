import { randomUUID } from "crypto";
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { UsuarioEntity } from "./usuario.entity";

@Entity({ name: "recados" })
export class RecadoEntity {
  @PrimaryColumn({ type: "uuid" })
  id!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  titulo!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  recado!: string;

  @Column({ name: "criado_por", type: "varchar", length: 255, nullable: false })
  criadoPor!: string;

  @Column({ name: "criado_em", type: "timestamp", nullable: false })
  criadoEm!: Date;

  @Column({ type: "boolean", nullable: false })
  arquivado!: boolean;

  @Column({ name: "id_usuario", type: "uuid", nullable: false })
  idUsuario!: string;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.recados)
  @JoinColumn({
    name: "id_usuario",
    foreignKeyConstraintName: "recados_id_usuario_fkey",
    referencedColumnName: "id",
  })
  usuario!: UsuarioEntity;

  @BeforeInsert()
  beforeInsert() {
    // o que deve ser feito antes de inserir um novo registro de transação
    this.id = randomUUID();
    this.criadoEm = new Date();
  }
}
