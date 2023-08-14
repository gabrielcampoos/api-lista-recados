import { Recado } from "../../models";
import { RecadosRepository } from "../../repository";

export type EditarRecadoDTO = {
  id: string;
  titulo?: string;
  recado?: string;
  arquivado?: boolean;
};

export type RetornoEditar = {
  sucesso: boolean;
  mensagem: string;
  dadosRetornados?: Recado;
};

export class EditarRecado {
  constructor(private dados: EditarRecadoDTO) {
    this.dados = dados;
  }

  execute(idUsuario: string): RetornoEditar {
    const repository = new RecadosRepository();

    const usuarioExiste = repository.usuarioExiste(idUsuario);

    if (!usuarioExiste) {
      return {
        sucesso: false,
        mensagem: "Usuário não cadastrado.",
      };
    }

    const recadoExiste = repository.recadoExiste(this.dados.id);

    if (!recadoExiste) {
      return {
        sucesso: false,
        mensagem: "Este recado não existe.",
      };
    }

    const retorno = repository.editarRecado(this.dados);

    if (!retorno.sucesso) {
      return {
        sucesso: retorno.sucesso,
        mensagem: retorno.mensagem,
      };
    }

    return {
      sucesso: retorno.sucesso,
      mensagem: retorno.mensagem,
      dadosRetornados: retorno.dadosRetornados,
    };
  }
}
