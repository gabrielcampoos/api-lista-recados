"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditarRecado = void 0;
const repository_1 = require("../../repository");
class EditarRecado {
    constructor(dados) {
        this.dados = dados;
        this.dados = dados;
    }
    execute(idUsuario) {
        const repository = new repository_1.RecadosRepository();
        const usuarioExiste = repository.usuarioExiste(idUsuario);
        if (!usuarioExiste) {
            return {
                sucesso: false,
                mensagem: "Usuário não cadastrado.",
            };
        }
        const recadoExiste = repository.recadoExiste(this.dados.id);
        if (!recadoExiste) {
            return {
                sucesso: false,
                mensagem: "Este recado não existe.",
            };
        }
        const retorno = repository.editarRecado(this.dados);
        if (!retorno.sucesso) {
            return {
                sucesso: retorno.sucesso,
                mensagem: retorno.mensagem,
            };
        }
        return {
            sucesso: retorno.sucesso,
            mensagem: retorno.mensagem,
            dadosRetornados: retorno.dadosRetornados,
        };
    }
}
exports.EditarRecado = EditarRecado;
