import { UsuariosRepository } from "../../../../../src/app/features/usuarios/repositories";
import { CadastrarUsuario } from "../../../../../src/app/features/usuarios/usecases";
import { Usuario } from "../../../../../src/app/models";
import {
  DatabaseConnection,
  RedisConnection,
} from "../../../../../src/main/database";

describe("Testes para o usecase de cadastrar usuário", () => {
  jest.mock("../../../../../src/app/features/usuarios/repositories");

  function createSut() {
    return new CadastrarUsuario();
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

  test("Deve retornar false quando chamar o método execute passando um e-mail que já existe na base de dados", async () => {
    jest
      .spyOn(UsuariosRepository.prototype, "verificarSeExisteUsuarioPorEmail")
      .mockResolvedValue(true);

    const sut = createSut();
    const resultado = await sut.execute({
      nome: "any_nome",
      email: "any_email",
      senha: "any_senha",
    });

    expect(resultado.sucesso).toBe(false);
    expect(resultado.mensagem).toBe(
      "Já existe um usuário cadastrado com esse e-mail."
    );
    expect(resultado.dados).toBeUndefined();
  });

  test("Deve cadastrar um usário quando chamar o método execute passando um e-mail que não existe na base de dados.", async () => {
    const usuarioFake = new Usuario("any_nome", "any_email", "any_senha");
    jest
      .spyOn(UsuariosRepository.prototype, "verificarSeExisteUsuarioPorEmail")
      .mockResolvedValue(false);

    jest
      .spyOn(UsuariosRepository.prototype, "cadastrar")
      .mockResolvedValue(usuarioFake);

    const sut = createSut();

    const resultado = await sut.execute({
      nome: "any_nome",
      email: "any_email",
      senha: "any_senha",
    });

    expect(resultado).toEqual({
      sucesso: true,
      mensagem: "Usuário cadastrado com sucesso!",
      dados: usuarioFake.toJSON(),
    });
  });
});
