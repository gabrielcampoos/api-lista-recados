"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecadoRepository = void 0;
const database_1 = require("../../../../main/database");
const models_1 = require("../../../models");
const entities_1 = require("../../../shared/database/entities");
class RecadoRepository {
    _manager = database_1.DatabaseConnection.connection.manager;
    async usuarioExiste(id) {
        const usuarioEncontrado = await this._manager.findOneBy(entities_1.UsuarioEntity, {
            id,
        });
        return !!usuarioEncontrado;
    }
    async recadoExiste(criadoPor, idRecado) {
        const recadoEncontrado = await this._manager.findOne(entities_1.RecadoEntity, {
            where: { id: idRecado, criadoPor },
            relations: { usuario: true },
        });
        if (!recadoEncontrado)
            return undefined;
        return this.entityToModel(recadoEncontrado);
    }
    async criarRecado(dados) {
        const { titulo, recado, criadoPor } = dados;
        const novoRecado = this._manager.create(entities_1.RecadoEntity, {
            titulo,
            recado,
            criadoPor,
        });
        const recadoCriado = await this._manager.save(novoRecado);
        return this.entityToModel(recadoCriado);
    }
    async listarRecados(idUsuario) {
        const clausula = {
            criadoPor: idUsuario,
            arquivado: false,
        };
        const recadosFiltrados = await this._manager.find(entities_1.RecadoEntity, {
            where: clausula,
        });
        return recadosFiltrados.map((r) => this.entityToModel(r));
    }
    async listarArquivados(idUsuario) {
        const clausula = {
            criadoPor: idUsuario,
            arquivado: true,
        };
        const recadosFiltrados = await this._manager.find(entities_1.RecadoEntity, {
            where: clausula,
        });
        return recadosFiltrados.map((r) => this.entityToModel(r));
    }
    async editarRecado(dados) {
        const { idRecado, titulo, recado, arquivado, criadoPor } = dados;
        await this._manager.update(entities_1.RecadoEntity, { id: idRecado }, { titulo, recado, arquivado, criadoPor: criadoPor });
    }
    async excluirRecado(id) {
        const recadoDelete = await this._manager.delete(entities_1.RecadoEntity, {
            where: {
                id: id,
            },
        });
        // const usuarios = await usuarioRepo.find(UsuarioEntity, {
        // 	where: {
        // 		email: ILike('leticia'),
        // 	},
        // });
        if (!recadoDelete.affected) {
            return {
                sucesso: false,
                mensagem: "Recado não encontrado.",
            };
        }
        return {
            sucesso: true,
            mensagem: "Recado excluído com sucesso.",
            dadosRetornados: id,
        };
    }
    // TRANSFORMA RESULTADO DA BUSCA EM UMA INSTANCIA DA MODEL
    entityToModel(dadosDB) {
        const { id, titulo, recado, criadoPor } = dadosDB;
        const retorno = new models_1.Recado(id, titulo, recado, criadoPor);
        return retorno;
    }
}
exports.RecadoRepository = RecadoRepository;
