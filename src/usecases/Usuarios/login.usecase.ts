import { UsuariosRepository } from "../../repository";

export type UsuariosSemSenha = {
  id: string;
  nome: string;
  email: string;
};

export type RespostaListar = {
  sucesso: boolean;
  mensagem: string;
  dadoCadastrado?: UsuariosSemSenha;
};

export class ListarUsuario {
  execute(emailUser: string, senhaUser: string): RespostaListar {
    const repository = new UsuariosRepository();

    if (!repository.emailExiste(emailUser)) {
      return {
        sucesso: false,
        mensagem: "Usuário não cadastrado!",
      };
    }

    const retorno = repository.testarUsuario(emailUser, senhaUser);

    if (!retorno.sucesso) {
      return retorno;
    }

    return retorno;
  }
}
