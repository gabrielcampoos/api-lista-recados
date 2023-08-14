"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcluirRecado = void 0;
const repository_1 = require("../../repository");
class ExcluirRecado {
    execute(id) {
        const repository = new repository_1.RecadosRepository();
        const retorno = repository.excluirRecado(id);
        return retorno;
    }
}
exports.ExcluirRecado = ExcluirRecado;
