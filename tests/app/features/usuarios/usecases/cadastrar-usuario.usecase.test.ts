import { UsuariosRepository } from "../../../../../src/app/features/usuarios/repositories";
import { CadastrarUsuario } from "../../../../../src/app/features/usuarios/usecases";
import {
  DatabaseConnection,
  RedisConnection,
} from "../../../../../src/main/database";
import { criarUsuarios } from "../../../../helpers/criar-usuarios.builder";

describe("Testes para o usecase de cadastrar usuário", () => {
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

  afterEach(async () => {
    await new UsuariosRepository().clear();
  });

  test("Deve retornar um objeto de erro quando o usuário existir.", async () => {
    const [usuario] = await criarUsuarios();
    const sut = createSut();

    const resultado = await sut.execute({
      nome: usuario.json.nome,
      email: usuario.json.email,
      senha: "any_senha",
    });

    expect(resultado.sucesso).toBe(false);
    expect(resultado.mensagem).toBe(
      "Já existe um usuário cadastrado com esse e-mail."
    );
    expect(resultado.dados).toBeUndefined();
  });

  test("Deve cadastrar um usuário passando um e-mail que não existe na base de dados", async () => {
    const sut = createSut();

    const resultado = await sut.execute({
      nome: "any_nome",
      email: "any_email",
      senha: "any_senha",
    });

    expect(resultado.sucesso).toBe(true);
    expect(resultado.mensagem).toBe("Usuário cadastrado com sucesso!");
    expect(resultado.dados).toBeTruthy();
  });
});
