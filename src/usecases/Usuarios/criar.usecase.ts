import { Usuario, UsuarioDTO } from "../../models";
import { UsuariosRepository } from "../../repository";

type RespostaCadastro = {
  sucesso: boolean;
  mensagem: string;
  dadoCadastrado?: Usuario;
};

export class CadastrarUsuario {
  #dados: UsuarioDTO;

  constructor(dados: UsuarioDTO) {
    this.#dados = dados;
  }

  execute(): RespostaCadastro {
    const repository = new UsuariosRepository();

    if (repository.emailExiste(this.#dados.email)) {
      return {
        sucesso: false,
        mensagem: "Email já cadastrado.",
      };
    }

    const retorno = repository.cadastrarUsuario(this.#dados);

    return {
      sucesso: true,
      mensagem: "Usuário cadastrado com sucesso!",
      dadoCadastrado: retorno,
    };
  }
}
