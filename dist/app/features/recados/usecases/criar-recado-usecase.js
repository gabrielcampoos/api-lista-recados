"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriarRecado = void 0;
const recados_repository_1 = require("../repositories/recados.repository");
class CriarRecado {
    async execute(dadosNovoRecado) {
        const repository = new recados_repository_1.RecadoRepository();
        // 1 - verifica se existe um outro usuario com o mesmo email já cadastrado
        const existe = await repository.usuarioExiste(dadosNovoRecado.criadoPor);
        if (!existe) {
            return {
                sucesso: false,
                mensagem: "Usuário não cadastrado.",
            };
        }
        // 2 - criar o novo recado
        const retorno = await repository.criarRecado(dadosNovoRecado);
        if (!retorno) {
            return {
                sucesso: false,
                mensagem: "Recado não foi criado.",
            };
        }
        return {
            sucesso: true,
            mensagem: "Recado criado com sucesso!",
            dados: retorno.toJSON(),
        };
    }
}
exports.CriarRecado = CriarRecado;
