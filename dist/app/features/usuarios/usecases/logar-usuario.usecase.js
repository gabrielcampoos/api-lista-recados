"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogarUsuario = void 0;
const repositories_1 = require("../repositories");
class LogarUsuario {
    async execute(dadosUsuario) {
        // 1 - email e senha devem corresponder a um registro dentro da lista de usuarios
        const repository = new repositories_1.UsuariosRepository();
        const usuarioEncontrado = await repository.autenticacaoLogin(dadosUsuario);
        if (!usuarioEncontrado) {
            return {
                sucesso: false,
                mensagem: "Usuário não autorizado.",
            };
        }
        return {
            sucesso: true,
            mensagem: "Usuário autorizado.",
            dados: usuarioEncontrado.toJSON(),
        };
    }
}
exports.LogarUsuario = LogarUsuario;
