import { RecadoRepository } from "../../../../../src/app/features/recados/repositories/recados.repository";
import { CriarRecado } from "../../../../../src/app/features/recados/usecases/criar-recado-usecase";
import { Recado } from "../../../../../src/app/models";
import {
  DatabaseConnection,
  RedisConnection,
} from "../../../../../src/main/database";
import { criarUsuarios } from "../../../../helpers/criar-usuarios.builder";

describe("Testes para o usecase de criar recados", () => {
  jest.mock(
    "../../../../src/app/features/recados/repositories/recados.repository"
  );

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

  beforeAll(() => {
    jest.clearAllMocks();
  });

  test("Deve retornar um objeto de erro quando o usuário não existir", async () => {
    jest
      .spyOn(RecadoRepository.prototype, "usuarioExiste")
      .mockResolvedValue(false);

    const [usuario] = await criarUsuarios();

    const sut = createSut();
    const resultado = await sut.execute({
      titulo: "",
      recado: "",
      criado_por: usuario.model.toJSON().email,
    });

    expect(resultado).toEqual({
      sucesso: false,
      mensagem: "Usuário não cadastrado.",
    });
  });

  test("Deve retornar um objeto de sucesso com os dados cadastrados passando os valores corretamente", async () => {
    const [usuario] = await criarUsuarios();
    jest
      .spyOn(RecadoRepository.prototype, "usuarioExiste")
      .mockResolvedValue(true);

    const recadoFake = new Recado(
      usuario.model.toJSON().email,
      "any_titulo",
      "any_recado"
    );
    jest
      .spyOn(RecadoRepository.prototype, "criarRecado")
      .mockResolvedValue(recadoFake);

    const sut = createSut();
    const resultado = await sut.execute({
      titulo: recadoFake.toJSON().titulo,
      recado: recadoFake.toJSON().recado,
      criado_por: recadoFake.toJSON().criado_por,
    });

    expect(resultado).toEqual({
      sucesso: true,
      mensagem: "Recado criado com sucesso!",
      dados: recadoFake.toJSON(),
    });
  });
});
