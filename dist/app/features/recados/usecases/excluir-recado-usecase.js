"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcluirRecado = void 0;
const repositories_1 = require("../../../shared/database/repositories");
const repositories_2 = require("../../usuarios/repositories");
const recados_repository_1 = require("../repositories/recados.repository");
class ExcluirRecado {
    async execute(dados) {
        const { idUsuario, idRecado } = dados;
        const repositoryUsuario = new repositories_2.UsuariosRepository();
        const repositoryRecado = new recados_repository_1.RecadoRepository();
        const cacheRepository = new repositories_1.CacheRepository();
        const usuarioEncontrado = await repositoryUsuario.buscaUsuarioPorID(idUsuario);
        if (!usuarioEncontrado) {
            return {
                sucesso: false,
                mensagem: "Usuário não foi encontrado. Não foi possível excluir o recado.",
            };
        }
        const recado = await repositoryRecado.recadoExiste(idUsuario, idRecado);
        if (!recado) {
            return {
                sucesso: false,
                mensagem: "Recado não encontrado.",
            };
        }
        await repositoryRecado.excluirRecado(idRecado);
        await cacheRepository.delete(`recados-usuario-${idUsuario}`);
        await cacheRepository.delete(`recado-${idRecado}`);
        return {
            sucesso: true,
            mensagem: "Recado deletado com sucesso.",
        };
    }
}
exports.ExcluirRecado = ExcluirRecado;
