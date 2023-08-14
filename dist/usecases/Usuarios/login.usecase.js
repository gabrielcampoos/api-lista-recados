"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListarUsuario = void 0;
const repository_1 = require("../../repository");
class ListarUsuario {
    execute(emailUser, senhaUser) {
        const repository = new repository_1.UsuariosRepository();
        if (!repository.emailExiste(emailUser)) {
            return {
                sucesso: false,
                mensagem: "Usuário não cadastrado!",
            };
        }
        const retorno = repository.testarUsuario(emailUser, senhaUser);
        if (!retorno.sucesso) {
            return retorno;
        }
        return retorno;
    }
}
exports.ListarUsuario = ListarUsuario;
