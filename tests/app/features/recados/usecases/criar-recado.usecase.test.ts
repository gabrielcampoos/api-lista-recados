import { RecadoRepository } from "../../../../../src/app/features/recados/repositories/recados.repository";
import { CriarRecado } from "../../../../../src/app/features/recados/usecases/criar-recado-usecase";
import { UsuariosRepository } from "../../../../../src/app/features/usuarios/repositories";
import {
  DatabaseConnection,
  RedisConnection,
} from "../../../../../src/main/database";
import { criarRecados } from "../../../../helpers/criar-recados.builder";

describe("Testes para o usecase de criar recados", () => {
  function createSut() {
    return new CriarRecado();
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
    await new RecadoRepository().clear();
    await new UsuariosRepository().clear();
  });

  test("Deve retornar um objeto de erro quando o usuário não existir", async () => {
    const sut = createSut();

    const resultado = await sut.execute({
      titulo: "any_titulo",
      recado: "any_recado",
      criado_por: "any_criado_por",
    });

    expect(resultado).toEqual({
      sucesso: false,
      mensagem: "Usuário não cadastrado.",
    });
  });

  test("Deve retornar um objeto de sucesso com os dados cadastrados passando os valores corretamente", async () => {
    const [recado] = await criarRecados();

    const sut = createSut();

    const resultado = await sut.execute({
      titulo: recado.model.toJSON().titulo,
      recado: recado.model.toJSON().recado,
      criado_por: recado.model.toJSON().criado_por,
    });

    expect(resultado.sucesso).toBe(true);
    expect(resultado.mensagem).toBe("Recado criado com sucesso!");
    expect(resultado.dados).toBeDefined();
  });
});
