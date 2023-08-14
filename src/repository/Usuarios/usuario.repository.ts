import { usuarios } from "../../database";
import { Usuario, UsuarioDTO } from "../../models";
import { RespostaListar } from "../../usecases";

export class UsuariosRepository {
  emailExiste(email: string): boolean {
    const emailExiste = usuarios.some((i) => i.toJSON().email === email);

    return emailExiste;
  }

  cadastrarUsuario(dados: UsuarioDTO): Usuario {
    const novoUsuario = new Usuario(dados);

    usuarios.push(novoUsuario);
    return novoUsuario;
  }

  testarUsuario(email: string, senha: string): RespostaListar {
    const user = usuarios.find(
      (u) => u.toJSON().email === email && u.toJSON().senha === senha
    );

    if (!user) {
      return {
        sucesso: false,
        mensagem: "Email e/ou senha incorretos.",
      };
    }

    return {
      sucesso: true,
      mensagem: "Usuário logado com sucesso!",
      dadoCadastrado: user.noPassword(),
    };
  }
}
