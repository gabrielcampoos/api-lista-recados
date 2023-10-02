"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecadosController = void 0;
const criar_recado_usecase_1 = require("../usecases/criar-recado-usecase");
const editar_recado_usecase_1 = require("../usecases/editar-recado-usecase");
const excluir_recado_usecase_1 = require("../usecases/excluir-recado-usecase");
const listar_recados_usecase_1 = require("../usecases/listar-recados-usecase");
class RecadosController {
    static async criar(req, res) {
        const recado = req.body;
        try {
            const usecase = new criar_recado_usecase_1.CriarRecado();
            const resultado = await usecase.execute(recado);
            if (!resultado.sucesso)
                return undefined;
            return res.status(200).json(resultado);
        }
        catch (erro) {
            return res.status(500).json(erro.toString());
        }
    }
    static async listarTodos(req, res) {
        try {
            const { idRecado } = req.body;
            const usecase = new listar_recados_usecase_1.ListarRecados();
            const resultado = await usecase.execute(idRecado);
            if (!resultado.sucesso)
                return res.status(404).json(resultado);
            return res.status(200).json(resultado);
        }
        catch (erro) {
            return res.status(500).json(erro.toString());
        }
    }
    static async deletar(req, res) {
        try {
            const { idUsuario } = req.body;
            const { idRecado } = req.params;
            const usecase = new excluir_recado_usecase_1.ExcluirRecado();
            const resultado = await usecase.execute({ idRecado, idUsuario });
            if (!resultado.sucesso)
                return res.status(404).json(resultado);
            return res.status(200).json(resultado);
        }
        catch (erro) {
            return res.status(500).json(erro.toString());
        }
    }
    static async editar(req, res) {
        try {
            const { idRecado } = req.params;
            const { idUsuario, recado, titulo, arquivado, criadoEm } = req.body;
            const usecase = new editar_recado_usecase_1.EditarRecado();
            const resultado = usecase.execute({
                idRecado,
                idUsuario,
                novosDados: { titulo, recado, arquivado, criadoEm },
            });
            if (!resultado) {
                return res.status(404).json(resultado);
            }
            return res.status(200).json(resultado);
        }
        catch (erro) {
            return res.status(500).json(erro.toString());
        }
    }
}
exports.RecadosController = RecadosController;
