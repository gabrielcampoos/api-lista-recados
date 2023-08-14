"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosRepository = void 0;
const database_1 = require("../../database");
const models_1 = require("../../models");
class UsuariosRepository {
    emailExiste(email) {
        const emailExiste = database_1.usuarios.some((i) => i.toJSON().email === email);
        return emailExiste;
    }
    cadastrarUsuario(dados) {
        const novoUsuario = new models_1.Usuario(dados);
        database_1.usuarios.push(novoUsuario);
        return novoUsuario;
    }
    testarUsuario(email, senha) {
        const user = database_1.usuarios.find((u) => u.toJSON().email === email && u.toJSON().senha === senha);
        if (!user) {
            return {
                sucesso: false,
                mensagem: "Email e/ou senha incorretos.",
            };
        }
        return {
            sucesso: true,
            mensagem: "Usuário logado com sucesso!",
            dadoCadastrado: user.noPassword(),
        };
    }
}
exports.UsuariosRepository = UsuariosRepository;
