import { RecadosRepository } from "../../repository";

export type RetornoExcluir = {
  sucesso: boolean;
  mensagem: string;
  dadosRetornados?: string;
};

export class ExcluirRecado {
  execute(id: string): RetornoExcluir {
    const repository = new RecadosRepository();

    const retorno = repository.excluirRecado(id);

    return retorno;
  }
}
