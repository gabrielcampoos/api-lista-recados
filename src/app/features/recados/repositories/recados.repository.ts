import { FindOptionsWhere } from "typeorm";
import { DatabaseConnection } from "../../../../main/database";
import { Recado } from "../../../models";
import { RecadoEntity, UsuarioEntity } from "../../../shared/database/entities";
import { CriarRecadoDTO } from "../usecases/criar-recado-usecase";

export type RetornoExcluir = {
  sucesso: boolean;
  mensagem: string;
  dadosRetornados?: string;
};

export type AtualizarDTO = {
  idRecado: string;
  titulo?: string;
  recado?: string;
  arquivado: boolean;
  criadoPor: string;
};

export class RecadoRepository {
  private _manager = DatabaseConnection.connection.manager;

  public async usuarioExiste(id: string): Promise<boolean> {
    const usuarioEncontrado = await this._manager.findOne(UsuarioEntity, {
      where: { id },
    });

    return !!usuarioEncontrado;
  }

  public async recadoExiste(
    idUsuario: string,
    idRecado: string
  ): Promise<Recado | undefined> {
    const recadoEncontrado = await this._manager.findOne(RecadoEntity, {
      where: { id: idRecado, idUsuario },
      relations: { usuario: true },
    });

    if (!recadoEncontrado) return undefined;

    return this.entityToModel(recadoEncontrado);
  }

  public async criarRecado(dados: CriarRecadoDTO): Promise<Recado> {
    const { titulo, recado, criadoPor } = dados;

    const novoRecado = this._manager.create(RecadoEntity, {
      titulo,
      recado,
      criadoPor,
    });

    const recadoCriado = await this._manager.save(novoRecado);

    return this.entityToModel(recadoCriado);
  }

  public async listarRecados(idUsuario: string): Promise<Recado[]> {
    const clausula: FindOptionsWhere<RecadoEntity> = {
      criadoPor: idUsuario,
      arquivado: false,
    };

    const recadosFiltrados = await this._manager.find(RecadoEntity, {
      where: clausula,
    });

    return recadosFiltrados.map((r) => this.entityToModel(r));
  }

  public async listarArquivados(idUsuario: string): Promise<Recado[]> {
    const clausula: FindOptionsWhere<RecadoEntity> = {
      criadoPor: idUsuario,
      arquivado: true,
    };

    const recadosFiltrados = await this._manager.find(RecadoEntity, {
      where: clausula,
    });

    return recadosFiltrados.map((r) => this.entityToModel(r));
  }

  async editarRecado(dados: AtualizarDTO): Promise<void> {
    const { idRecado, titulo, recado, arquivado, criadoPor } = dados;

    await this._manager.update(
      RecadoEntity,
      { id: idRecado },
      { titulo, recado, arquivado, criadoPor: criadoPor }
    );
  }

  public async excluirRecado(id: string): Promise<RetornoExcluir> {
    const recadoDelete = await this._manager.delete(RecadoEntity, {
      where: {
        id: id,
      },
    });

    // const usuarios = await usuarioRepo.find(UsuarioEntity, {
    // 	where: {
    // 		email: ILike('leticia'),
    // 	},
    // });

    if (!recadoDelete.affected) {
      return {
        sucesso: false,
        mensagem: "Recado não encontrado.",
      };
    }

    return {
      sucesso: true,
      mensagem: "Recado excluído com sucesso.",
      dadosRetornados: id,
    };
  }

  // TRANSFORMA RESULTADO DA BUSCA EM UMA INSTANCIA DA MODEL
  private entityToModel(dadosDB: RecadoEntity): Recado {
    const { id, titulo, recado, criadoPor } = dadosDB;

    const retorno = new Recado(id, titulo, recado, criadoPor);

    return retorno;
  }
}
