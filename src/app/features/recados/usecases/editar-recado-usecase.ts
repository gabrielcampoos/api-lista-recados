import { UsuariosRepository } from "../../usuarios/repositories";
import { RecadoRepository } from "../repositories/recados.repository";
import { RetornoCriarRecado } from "./criar-recado-usecase";

type AtualizarRecadoDTO = {
  idUsuario: string;
  idRecado: string;
  novosDados: {
    titulo?: number;
    recado?: string;
    criadoEm?: Date;
  };
};

export class AtualizarRecado {
  public async execute(dados: AtualizarRecadoDTO): Promise<RetornoCriarRecado> {
    const { idUsuario, idRecado, novosDados } = dados;

    const repositoryUsuario = new UsuariosRepository();
    const repositoryRecado = new RecadoRepository();

    const usuarioEncontrado = await repositoryUsuario.buscaUsuarioPorID(
      idUsuario
    );

    if (!usuarioEncontrado) {
      return {
        sucesso: false,
        mensagem:
          "Usuário não encontrado. Não foi possível atualizar o recado.",
      };
    }

    const recadoBuscado = await repositoryRecado.recadoExiste(idRecado);

    if (!recadoBuscado) {
      return {
        sucesso: false,
        mensagem: "Recado não encontrado.",
      };
    }

    const atualizada = await repositoryRecado.editarRecado({
      id: idRecado,
      arquivado: false,
      titulo: "",
      recado: "",
      criadoPor: "",
    });

    if (!atualizada) {
      return {
        sucesso: false,
        mensagem: "Recado não foi atualizado.",
      };
    }

    return {
      sucesso: true,
      mensagem: "Recado atualizado com sucesso.",
      dados: atualizada.dados,
    };
  }
}
