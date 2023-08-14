import { Recado } from "../../models";
import { RecadosRepository } from "../../repository";

type RetornoListar = {
  sucesso: boolean;
  mensagem: string;
  dadosRetornados?: Recado[];
};

export class ListarRecados {
  listarTodos(idUsuario: string): RetornoListar {
    const repository = new RecadosRepository();

    if (!repository.usuarioExiste(idUsuario)) {
      return {
        sucesso: false,
        mensagem: "Usuário não cadastrado.",
      };
    }

    const dadosRetornados = repository.listarRecados(idUsuario);

    return {
      sucesso: true,
      mensagem: "Recados listados com sucesso.",
      dadosRetornados: dadosRetornados,
    };
  }

  listarArquivados(idUsuario: string): RetornoListar {
    const repository = new RecadosRepository();

    if (!repository.usuarioExiste(idUsuario)) {
      return {
        sucesso: false,
        mensagem: "Usuário não cadastrado.",
      };
    }

    const dadosRetornados = repository.listarArquivados(idUsuario);

    return {
      sucesso: true,
      mensagem: "Recados arquivados listados com sucesso.",
      dadosRetornados: dadosRetornados,
    };
  }
}
