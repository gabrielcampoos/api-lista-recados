import { RecadoRepository } from "../../src/app/features/recados/repositories/recados.repository";
import { criarUsuarios } from "./criar-usuarios.builder";

export async function criarRecados() {
  const recadosRepository = new RecadoRepository();

  const [usuario] = await criarUsuarios();

  const recadoData1 = {
    titulo: "any_titulo",
    recado: "any_recado",
    criado_por: usuario.model.toJSON().email,
  };
  const recadoData2 = {
    titulo: "any_titulo",
    recado: "any_recado",
    criado_por: usuario.model.toJSON().email,
  };
  const recadoData3 = {
    titulo: "any_titulo",
    recado: "any_recado",
    criado_por: usuario.model.toJSON().email,
  };

  const recado1 = await recadosRepository.criarRecado(recadoData1);
  const recado2 = await recadosRepository.criarRecado(recadoData2);
  const recado3 = await recadosRepository.criarRecado(recadoData3);

  return [
    { json: recadoData1, model: recado1 },
    { json: recadoData2, model: recado2 },
    { json: recadoData3, model: recado3 },
  ];
}
