"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListarRecados = void 0;
const repository_1 = require("../../repository");
class ListarRecados {
    listarTodos(idUsuario) {
        const repository = new repository_1.RecadosRepository();
        if (!repository.usuarioExiste(idUsuario)) {
            return {
                sucesso: false,
                mensagem: "Usuário não cadastrado.",
            };
        }
        const dadosRetornados = repository.listarRecados(idUsuario);
        return {
            sucesso: true,
            mensagem: "Recados listados com sucesso.",
            dadosRetornados: dadosRetornados,
        };
    }
    listarArquivados(idUsuario) {
        const repository = new repository_1.RecadosRepository();
        if (!repository.usuarioExiste(idUsuario)) {
            return {
                sucesso: false,
                mensagem: "Usuário não cadastrado.",
            };
        }
        const dadosRetornados = repository.listarArquivados(idUsuario);
        return {
            sucesso: true,
            mensagem: "Recados arquivados listados com sucesso.",
            dadosRetornados: dadosRetornados,
        };
    }
}
exports.ListarRecados = ListarRecados;
