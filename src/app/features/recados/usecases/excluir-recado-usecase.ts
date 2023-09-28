import { CacheRepository } from "../../../shared/database/repositories";
import { UsuariosRepository } from "../../usuarios/repositories";
import { RecadoRepository } from "../repositories/recados.repository";

export type RetornoExcluir = {
  sucesso: boolean;
  mensagem: string;
  dadosRetornados?: string;
};

type ExcluirRecadoDTO = {
  idUsuario: string;
  idRecado: string;
};

export class ExcluirRecado {
  async execute(dados: ExcluirRecadoDTO): Promise<RetornoExcluir> {
    const { idUsuario, idRecado } = dados;

    const repositoryUsuario = new UsuariosRepository();
    const repositoryRecado = new RecadoRepository();
    const cacheRepository = new CacheRepository();

    const usuarioEncontrado = await repositoryUsuario.buscaUsuarioPorID(
      idUsuario
    );

    if (!usuarioEncontrado) {
      return {
        sucesso: false,
        mensagem:
          "Usuário não foi encontrado. Não foi possível excluir o recado.",
      };
    }

    const recado = await repositoryRecado.recadoExiste(idUsuario, idRecado);

    if (!recado) {
      return {
        sucesso: false,
        mensagem: "Recado não encontrado.",
      };
    }

    await repositoryRecado.excluirRecado(idRecado);
    await cacheRepository.delete(`recados-usuario-${idUsuario}`);
    await cacheRepository.delete(`recado-${idRecado}`);

    return {
      sucesso: true,
      mensagem: "Recado deletado com sucesso.",
    };
  }
}
