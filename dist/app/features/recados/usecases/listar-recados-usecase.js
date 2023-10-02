"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListarRecados = void 0;
const repositories_1 = require("../../../shared/database/repositories");
const recados_repository_1 = require("../repositories/recados.repository");
class ListarRecados {
    async execute(idUsuario) {
        const repositoryRecado = new recados_repository_1.RecadoRepository();
        const cacheRepository = new repositories_1.CacheRepository();
        const busca = await repositoryRecado.usuarioExiste(idUsuario);
        if (!busca) {
            return {
                sucesso: false,
                mensagem: "Usuário não cadastrado.",
            };
        }
        const recadosCache = await cacheRepository.get(`recados-usuario-${idUsuario}`);
        let recados = [];
        if (!recadosCache) {
            const recadosPrincipal = await repositoryRecado.listarRecados(idUsuario);
            recados = recadosPrincipal.map((r) => r.toJSON());
            await cacheRepository.set(`recados-usuario-${idUsuario}`, recados);
        }
        else {
            recados = recadosCache;
        }
        return {
            sucesso: true,
            mensagem: "Recados listados com sucesso.",
        };
    }
    async listarArquivados(idUsuario) {
        const repository = new recados_repository_1.RecadoRepository();
        const busca = await repository.usuarioExiste(idUsuario);
        if (!busca) {
            return {
                sucesso: false,
                mensagem: "Usuário não cadastrado.",
            };
        }
        const dadosRetornados = await repository.listarArquivados(idUsuario);
        return {
            sucesso: true,
            mensagem: "Recados arquivados listados com sucesso.",
            dadosRetornados: dadosRetornados,
        };
    }
}
exports.ListarRecados = ListarRecados;
