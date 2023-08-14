import { recados, usuarios } from "../../database";
import { Recado, RecadoDTO } from "../../models";
import {
  EditarRecadoDTO,
  RetornoEditar,
} from "../../usecases/Recados/editar.usecase";
import { RetornoExcluir } from "../../usecases/Recados/excluir.usecase";

export class RecadosRepository {
  usuarioExiste(id: string): boolean {
    return usuarios.some((u) => u.toJSON().id === id);
  }

  recadoExiste(idRcado: string): boolean {
    return recados.some((r) => r.toJSON().id === idRcado);
  }

  criarRecado(dados: RecadoDTO): Recado {
    const novoRecado = new Recado(dados);

    recados.push(novoRecado);

    return novoRecado;
  }

  listarRecados(idUsuario: string) {
    const recadosFiltrados = recados.filter((r) => {
      return (
        r.toJSON().criadoPor === idUsuario && r.toJSON().arquivado === false
      );
    });

    return recadosFiltrados;
  }

  listarArquivados(idUsuario: string) {
    const recadosArquivados = recados.filter((r) => {
      return (
        r.toJSON().criadoPor === idUsuario && r.toJSON().arquivado === true
      );
    });

    return recadosArquivados;
  }

  editarRecado(dados: EditarRecadoDTO): RetornoEditar {
    const editarRecado = recados.find(
      (recado) => recado.toJSON().id === dados.id
    );

    if (!editarRecado) {
      return {
        sucesso: false,
        mensagem: "Recado não existe.",
      };
    }

    if (dados.titulo) {
      editarRecado.novoTitulo = dados.titulo;
    }

    if (dados.recado) {
      editarRecado.novoRecado = dados.recado;
    }

    if (dados.arquivado !== undefined) {
      editarRecado.switchArquivado = dados.arquivado;
    }

    editarRecado.novaData = new Date().toLocaleDateString();

    return {
      sucesso: true,
      mensagem: "Recado editado com sucesso.",
      dadosRetornados: editarRecado,
    };
  }

  excluirRecado(id: string): RetornoExcluir {
    const recadoIndex = recados.findIndex(
      (recado) => recado.toJSON().id === id
    );

    if (recadoIndex === -1) {
      return {
        sucesso: false,
        mensagem: "Recado não encontrado.",
      };
    }

    recados.splice(recadoIndex, 1);

    return {
      sucesso: true,
      mensagem: "Recado excluido com sucesso.",
      dadosRetornados: id,
    };
  }
}
