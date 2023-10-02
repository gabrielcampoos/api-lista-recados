"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CadastrarUsuario = void 0;
const repositories_1 = require("../repositories");
class CadastrarUsuario {
    async execute(dadosNovoUsuario) {
        const repository = new repositories_1.UsuariosRepository();
        // 1 - verifica se existe um outro usuario com o mesmo email já cadastrado
        const existe = await repository.verificarSeExisteUsuarioPorEmail(dadosNovoUsuario.email);
        if (existe) {
            return {
                sucesso: false,
                mensagem: "Já existe um usuário cadastrado com esse e-mail.",
            };
        }
        // 2 - criar o novo usuario
        const novoUsuarioCadastrado = await repository.cadastrar(dadosNovoUsuario);
        return {
            sucesso: true,
            mensagem: "Usuário cadastrado com sucesso!",
            dados: novoUsuarioCadastrado.toJSON(),
        };
    }
}
exports.CadastrarUsuario = CadastrarUsuario;
