"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecadosRepository = void 0;
const database_1 = require("../../database");
const models_1 = require("../../models");
class RecadosRepository {
    usuarioExiste(id) {
        return database_1.usuarios.some((u) => u.toJSON().id === id);
    }
    recadoExiste(idRcado) {
        return database_1.recados.some((r) => r.toJSON().id === idRcado);
    }
    criarRecado(dados) {
        const novoRecado = new models_1.Recado(dados);
        database_1.recados.push(novoRecado);
        return novoRecado;
    }
    listarRecados(idUsuario) {
        const recadosFiltrados = database_1.recados.filter((r) => {
            return (r.toJSON().criadoPor === idUsuario && r.toJSON().arquivado === false);
        });
        return recadosFiltrados;
    }
    listarArquivados(idUsuario) {
        const recadosArquivados = database_1.recados.filter((r) => {
            return (r.toJSON().criadoPor === idUsuario && r.toJSON().arquivado === true);
        });
        return recadosArquivados;
    }
    editarRecado(dados) {
        const editarRecado = database_1.recados.find((recado) => recado.toJSON().id === dados.id);
        if (!editarRecado) {
            return {
                sucesso: false,
                mensagem: "Recado não existe.",
            };
        }
        if (dados.titulo) {
            editarRecado.novoTitulo = dados.titulo;
        }
        if (dados.recado) {
            editarRecado.novoRecado = dados.recado;
        }
        if (dados.arquivado !== undefined) {
            editarRecado.switchArquivado = dados.arquivado;
        }
        editarRecado.novaData = new Date().toLocaleDateString();
        return {
            sucesso: true,
            mensagem: "Recado editado com sucesso.",
            dadosRetornados: editarRecado,
        };
    }
    excluirRecado(id) {
        const recadoIndex = database_1.recados.findIndex((recado) => recado.toJSON().id === id);
        if (recadoIndex === -1) {
            return {
                sucesso: false,
                mensagem: "Recado não encontrado.",
            };
        }
        database_1.recados.splice(recadoIndex, 1);
        return {
            sucesso: true,
            mensagem: "Recado excluido com sucesso.",
            dadosRetornados: id,
        };
    }
}
exports.RecadosRepository = RecadosRepository;
