"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosController = void 0;
const usecases_1 = require("../usecases");
class UsuariosController {
    static async cadastrar(req, res) {
        const { nome, email, senha } = req.body;
        try {
            const usecase = new usecases_1.CadastrarUsuario();
            const resultado = await usecase.execute({ nome, email, senha });
            if (!resultado.sucesso)
                return res.status(401).json(resultado);
            return res.status(200).json(resultado);
        }
        catch (erro) {
            return res.status(500).json(erro.toString());
        }
    }
    static async logar(req, res) {
        const { nome, email, senha } = req.body;
        try {
            const usecase = new usecases_1.LogarUsuario();
            const resultado = await usecase.execute({ nome, email, senha });
            if (!resultado.sucesso)
                return res.status(401).json(resultado);
            return res.status(200).json(resultado);
        }
        catch (erro) {
            return res.status(500).json(erro.toString());
        }
    }
}
exports.UsuariosController = UsuariosController;
