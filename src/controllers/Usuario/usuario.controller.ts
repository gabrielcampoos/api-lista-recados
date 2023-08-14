import { Request, Response } from "express";
import { CadastrarUsuario, ListarUsuario } from "../../usecases";

export class UsuariosController {
  cadastrar(req: Request, res: Response) {
    const { nome, email, senha } = req.body;

    const usecase = new CadastrarUsuario({ nome, email, senha });
    const resposta = usecase.execute();

    if (!resposta.sucesso) {
      return res.status(400).json(resposta);
    }

    return res.status(201).json(resposta);
  }

  logar(req: Request, res: Response) {
    const { email, senha } = req.body;
    const usecase = new ListarUsuario();
    const resposta = usecase.execute(email, senha);

    if (!resposta.sucesso) {
      return res.status(404).json(resposta);
    }

    return res.status(200).json(resposta);
  }
}
