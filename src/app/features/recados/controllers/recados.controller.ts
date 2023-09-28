import { Request, Response } from "express";
import { CriarRecado } from "../usecases/criar-recado-usecase";
import { AtualizarRecado } from "../usecases/editar-recado-usecase";
import { ExcluirRecado } from "../usecases/excluir-recado-usecase";
import { ListarRecados } from "../usecases/listar-recados-usecase";

export class RecadosController {
  public static async criar(req: Request, res: Response) {
    const { id, titulo, recado, criadoPor, arquivado } = req.body;

    // chamar as regras de negócio
    const usecase = new CriarRecado();
    const resposta = await usecase.execute({
      id,
      titulo,
      recado,
      criadoPor,
      arquivado,
    });

    if (!resposta.sucesso) {
      return res.status(400).json(resposta);
    }

    return res.status(201).json(resposta);
  }

  public static async listarTodos(req: Request, res: Response) {
    const { arquivado } = req.query;
    const { idUsuario } = req.params;

    // chamar as regras de negócio
    const usecase = new ListarRecados();

    if (arquivado === "false") {
      const retorno = await usecase.listarTodos(idUsuario);
      return res.status(200).json(retorno);
    }

    const retorno = await usecase.listarArquivados(idUsuario);
    return res.status(200).json(retorno);
  }

  public static async editar(req: Request, res: Response) {
    const { idUsuario } = req.params;
    const { idRecado, novosDados } = req.body;

    const usecase = new AtualizarRecado();
    const retorno = await usecase.execute({
      idUsuario,
      idRecado,
      novosDados,
    });

    if (!retorno.sucesso) {
      return res.status(404).json(retorno);
    }

    return res.status(200).json(retorno);
  }

  static async deletar(req: Request, res: Response) {
    const { idUsuario } = req.body;
    const { idRecado } = req.params;

    const usecase = new ExcluirRecado();
    const resultado = await usecase.execute({ idUsuario, idRecado });

    if (!resultado.sucesso) {
      return res.status(404).json(resultado);
    }

    return res.status(200).json(resultado);
  }
}
