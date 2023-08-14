"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosController = void 0;
const usecases_1 = require("../../usecases");
class UsuariosController {
    cadastrar(req, res) {
        const { nome, email, senha } = req.body;
        const usecase = new usecases_1.CadastrarUsuario({ nome, email, senha });
        const resposta = usecase.execute();
        if (!resposta.sucesso) {
            return res.status(400).json(resposta);
        }
        return res.status(201).json(resposta);
    }
    logar(req, res) {
        const { email, senha } = req.body;
        const usecase = new usecases_1.ListarUsuario();
        const resposta = usecase.execute(email, senha);
        if (!resposta.sucesso) {
            return res.status(404).json(resposta);
        }
        return res.status(200).json(resposta);
    }
}
exports.UsuariosController = UsuariosController;
