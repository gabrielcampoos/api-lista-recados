import { UsuariosRepository } from "../../src/app/features/usuarios/repositories";

export async function criarUsuarios() {
  const usuariosRepository = new UsuariosRepository();

  const usuarioData1 = {
    nome: "any_nome",
    email: "any_email1",
    senha: "any_senha",
  };
  const usuarioData2 = {
    nome: "any_nome",
    email: "any_email2",
    senha: "any_senha",
  };
  const usuarioData3 = {
    nome: "any_nome",
    email: "any_email3",
    senha: "any_senha",
  };

  const usuario1 = await usuariosRepository.cadastrar(usuarioData1);
  const usuario2 = await usuariosRepository.cadastrar(usuarioData2);
  const usuario3 = await usuariosRepository.cadastrar(usuarioData3);

  return [
    { json: usuarioData1, model: usuario1 },
    { json: usuarioData2, model: usuario2 },
    { json: usuarioData3, model: usuario3 },
  ];
}
