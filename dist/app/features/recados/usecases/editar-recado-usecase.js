"use strict";
// import { UsuariosRepository } from "../../usuarios/repositories";
// import { RecadoRepository } from "../repositories/recados.repository";
// import { RetornoCriarRecado } from "./criar-recado-usecase";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditarRecado = void 0;
const repositories_1 = require("../../../shared/database/repositories");
const repositories_2 = require("../../usuarios/repositories");
const recados_repository_1 = require("../repositories/recados.repository");
// export class AtualizarRecado {
//   public async execute(dados: AtualizarRecadoDTO): Promise<RetornoCriarRecado> {
//     const { idUsuario, idRecado, novosDados } = dados;
//     const repositoryUsuario = new UsuariosRepository();
//     const repositoryRecado = new RecadoRepository();
//     const usuarioEncontrado = await repositoryUsuario.buscaUsuarioPorID(
//       idUsuario
//     );
//     if (!usuarioEncontrado) {
//       return {
//         sucesso: false,
//         mensagem:
//           "Usuário não encontrado. Não foi possível atualizar o recado.",
//       };
//     }
//     const recadoBuscado = await repositoryRecado.recadoExiste(
//       idUsuario,
//       idRecado
//     );
//     if (!recadoBuscado) {
//       return {
//         sucesso: false,
//         mensagem: "Recado não encontrado.",
//       };
//     }
//     const atualizada = await repositoryRecado.editarRecado({
//       id: idRecado,
//       arquivado: false,
//       titulo: "",
//       recado: "",
//       criadoPor: "",
//     });
//     if (!atualizada) {
//       return {
//         sucesso: false,
//         mensagem: "Recado não foi atualizado.",
//       };
//     }
//     return {
//       sucesso: true,
//       mensagem: "Recado atualizado com sucesso.",
//       dados: atualizada.dados,
//     };
//   }
// }
const PREFIX_CACHE = "alterar-vaga";
class EditarRecado {
    async execute(dados) {
        const { idRecado, idUsuario, novosDados } = dados;
        const repositoryUsuario = new repositories_2.UsuariosRepository();
        const repositoryRecado = new recados_repository_1.RecadoRepository();
        const cacheRepository = new repositories_1.CacheRepository();
        const usuarioEncontrado = await repositoryUsuario.buscaUsuarioPorID(idUsuario);
        if (!usuarioEncontrado) {
            return {
                sucesso: false,
                mensagem: "Usuário não encontrado.",
            };
        }
        const recado = await repositoryRecado.recadoExiste(idUsuario, idRecado);
        if (!recado) {
            return {
                sucesso: false,
                mensagem: "Recado não encontrado.",
            };
        }
        const atualizado = recado.atualizarRecado({
            titulo: novosDados.titulo,
            recado: novosDados.recado,
            criadoEm: novosDados.criadoEm,
        });
        await cacheRepository.delete(`recados-usuario-${idUsuario}`);
        await cacheRepository.delete(`recado-${idRecado}`);
        if (!atualizado) {
            return {
                sucesso: false,
                mensagem: "Recado não pode ser atualizado",
            };
        }
        const recadoJSON = recado.toJSON();
        repositoryRecado.editarRecado({
            idRecado,
            titulo: recadoJSON.titulo,
            recado: recadoJSON.recado,
            criadoPor: recadoJSON.criadoPor,
            arquivado: dados.novosDados.arquivado,
        });
        return {
            sucesso: true,
            mensagem: "Recado editado com sucesso.",
        };
    }
}
exports.EditarRecado = EditarRecado;
