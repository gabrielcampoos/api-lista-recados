"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecadosController = void 0;
const criar_usecase_1 = require("../../usecases/Recados/criar.usecase");
const editar_usecase_1 = require("../../usecases/Recados/editar.usecase");
const excluir_usecase_1 = require("../../usecases/Recados/excluir.usecase");
const listar_usecase_1 = require("../../usecases/Recados/listar.usecase");
class RecadosController {
    criar(req, res) {
        const { titulo, recado, criadoPor } = req.body;
        const usecase = new criar_usecase_1.CriarRecado({ titulo, recado, criadoPor });
        const retorno = usecase.execute();
        if (!retorno.sucesso) {
            return res.status(400).json(retorno);
        }
        return res.status(201).json(retorno);
    }
    listarTodos(req, res) {
        const { arquivado } = req.query;
        const { idUsuario } = req.params;
        const usecase = new listar_usecase_1.ListarRecados();
        if (arquivado === "false") {
            const retorno = usecase.listarTodos(idUsuario);
            return res.status(200).json(retorno);
        }
        const retorno = usecase.listarArquivados(idUsuario);
        return res.status(200).json(retorno);
    }
    editar(req, res) {
        const { idUsuario } = req.params;
        const { id, titulo, recado, arquivado } = req.body;
        const usecase = new editar_usecase_1.EditarRecado({ id, titulo, recado, arquivado });
        const retorno = usecase.execute(idUsuario);
        if (!retorno.sucesso) {
            return res.status(404).json(retorno);
        }
        return res.status(200).json(retorno);
    }
    excluir(req, res) {
        const idRecado = req.params.id;
        const usecase = new excluir_usecase_1.ExcluirRecado();
        const retorno = usecase.execute(idRecado);
        if (!retorno.sucesso) {
            return res.status(404).json(retorno);
        }
        return res.status(200).json(retorno);
    }
}
exports.RecadosController = RecadosController;
