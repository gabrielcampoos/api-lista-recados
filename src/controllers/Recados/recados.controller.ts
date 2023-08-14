import { Request, Response } from "express";
import { RecadoDTO } from "../../models";
import { CriarRecado } from "../../usecases/Recados/criar.usecase";
import { EditarRecado } from "../../usecases/Recados/editar.usecase";
import { ExcluirRecado } from "../../usecases/Recados/excluir.usecase";
import { ListarRecados } from "../../usecases/Recados/listar.usecase";

export class RecadosController {
  criar(req: Request, res: Response) {
    const { titulo, recado, criadoPor }: RecadoDTO = req.body;

    const usecase = new CriarRecado({ titulo, recado, criadoPor });

    const retorno = usecase.execute();

    if (!retorno.sucesso) {
      return res.status(400).json(retorno);
    }

    return res.status(201).json(retorno);
  }

  listarTodos(req: Request, res: Response) {
    const { arquivado } = req.query;
    const { idUsuario } = req.params;

    const usecase = new ListarRecados();

    if (arquivado === "false") {
      const retorno = usecase.listarTodos(idUsuario);
      return res.status(200).json(retorno);
    }

    const retorno = usecase.listarArquivados(idUsuario);
    return res.status(200).json(retorno);
  }

  editar(req: Request, res: Response) {
    const { idUsuario } = req.params;
    const { id, titulo, recado, arquivado } = req.body;

    const usecase = new EditarRecado({ id, titulo, recado, arquivado });
    const retorno = usecase.execute(idUsuario);

    if (!retorno.sucesso) {
      return res.status(404).json(retorno);
    }

    return res.status(200).json(retorno);
  }

  excluir(req: Request, res: Response) {
    const idRecado = req.params.id;

    const usecase = new ExcluirRecado();

    const retorno = usecase.execute(idRecado);

    if (!retorno.sucesso) {
      return res.status(404).json(retorno);
    }

    return res.status(200).json(retorno);
  }
}
