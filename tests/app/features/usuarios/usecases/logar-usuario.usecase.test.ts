import { UsuariosRepository } from "../../../../../src/app/features/usuarios/repositories";
import { LogarUsuario } from "../../../../../src/app/features/usuarios/usecases";
import {
  DatabaseConnection,
  RedisConnection,
} from "../../../../../src/main/database";
import { criarUsuarios } from "../../../../helpers/criar-usuarios.builder";

describe("Testes para o usecase de logar usuário", () => {
  function createSut() {
    return new LogarUsuario();
  }

  beforeAll(async () => {
    await DatabaseConnection.connect();
    await RedisConnection.connect();
  });

  afterAll(async () => {
    await DatabaseConnection.destroy();
    await RedisConnection.destroy();
  });

  afterEach(async () => {
    await new UsuariosRepository().clear();
  });

  test("Deve retornar um objeto de erro quando chamar o método execute passando um e-mail e senha que não existem na base de dados", async () => {
    const sut = createSut();

    const resultado = await sut.execute({
      email: "any_email",
      senha: "any_senha",
    });

    expect(resultado).toEqual({
      sucesso: false,
      mensagem: "Usuário não autorizado.",
    });
  });

  test("Deve retornar um objeto de sucesso quando chamar o método execute passando um e-mail e senha que existem na base de dados", async () => {
    const [usuario] = await criarUsuarios();

    const sut = createSut();

    const resultado = await sut.execute({
      nome: usuario.json.nome,
      email: usuario.json.email,
      senha: usuario.json.senha,
    });

    expect(resultado).toEqual({
      sucesso: true,
      mensagem: "Usuário autorizado.",
      dados: usuario.model.toJSON(),
    });
  });
});
