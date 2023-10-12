import { UsuariosRepository } from "../../../../../src/app/features/usuarios/repositories";
import { LogarUsuario } from "../../../../../src/app/features/usuarios/usecases";
import { Usuario } from "../../../../../src/app/models";
import {
  DatabaseConnection,
  RedisConnection,
} from "../../../../../src/main/database";

describe("Testes para o usecase de logar usuário", () => {
  jest.mock("../../../../../src/app/features/usuarios/repositories");

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

  beforeAll(() => {
    jest.clearAllMocks();
  });

  test("Deve retornar um objeto de erro quando chamar o método execute passando um e-mail e senha que não existem na base de dados", async () => {
    jest
      .spyOn(UsuariosRepository.prototype, "autenticacaoLogin")
      .mockResolvedValue(undefined);

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
    const usuarioFake = new Usuario("any_nome", "any_email", "any_senha");

    jest
      .spyOn(UsuariosRepository.prototype, "autenticacaoLogin")
      .mockResolvedValue(usuarioFake);

    const sut = createSut();

    const resultado = await sut.execute({
      email: "any_email",
      senha: "any_senha",
    });

    expect(resultado).toEqual({
      sucesso: true,
      mensagem: "Usuário autorizado.",
      dados: usuarioFake.toJSON(),
    });
  });
});
