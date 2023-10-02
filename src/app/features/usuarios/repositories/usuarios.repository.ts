import { DatabaseConnection } from "../../../../main/database";
import { Usuario } from "../../../models";
import { UsuarioEntity } from "../../../shared/database/entities";
import { CadastrarLogarUsuarioDTO } from "../usecases";

export class UsuariosRepository {
  private _manager = DatabaseConnection.connection.manager;

  public async verificarSeExisteUsuarioPorEmail(
    email: string
  ): Promise<Usuario | null> {
    const usuarioEncontrado = await this._manager.findOneBy(UsuarioEntity, {
      email,
    });

    if (!usuarioEncontrado) return null;

    return this.entityToModel(usuarioEncontrado);
  }

  public async cadastrar(dados: CadastrarLogarUsuarioDTO): Promise<Usuario> {
    const newUser = this._manager.create(UsuarioEntity, { ...dados });
    const usuarioCriado = await this._manager.save(newUser);

    return this.entityToModel(usuarioCriado);
  }

  public async autenticacaoLogin(
    dados: CadastrarLogarUsuarioDTO
  ): Promise<Usuario | undefined> {
    const { email, senha } = dados;

    const usuarioEncontrado = await this._manager.findOne(UsuarioEntity, {
      where: { email, senha },
    });

    if (!usuarioEncontrado) return undefined;

    return this.entityToModel(usuarioEncontrado);
  }

  public async buscaUsuarioPorID(id: string): Promise<Usuario | undefined> {
    const usuarioEncontrado = await this._manager.findOneBy(UsuarioEntity, {
      id,
    });

    // const usuarios = await usuarioRepo.find(UsuarioEntity, {
    // 	where: {
    // 		email: ILike('leticia'),
    // 	},
    // });

    if (!usuarioEncontrado) return undefined;

    return this.entityToModel(usuarioEncontrado);
  }

  // TRANSFORMA RESULTADO DA BUSCA EM UMA INSTANCIA DA MODEL
  private entityToModel(dadosDB: UsuarioEntity): Usuario {
    return new Usuario(dadosDB.id, dadosDB.nome, dadosDB.email, dadosDB.senha);
  }
}
