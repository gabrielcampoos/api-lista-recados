"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosRepository = void 0;
const database_1 = require("../../../../main/database");
const models_1 = require("../../../models");
const entities_1 = require("../../../shared/database/entities");
class UsuariosRepository {
    _manager = database_1.DatabaseConnection.connection.manager;
    async verificarSeExisteUsuarioPorEmail(email) {
        const usuarioEncontrado = await this._manager.findOneBy(entities_1.UsuarioEntity, {
            email,
        });
        if (!usuarioEncontrado)
            return null;
        return this.entityToModel(usuarioEncontrado);
    }
    async cadastrar(dados) {
        const newUser = this._manager.create(entities_1.UsuarioEntity, { ...dados });
        const usuarioCriado = await this._manager.save(newUser);
        return this.entityToModel(usuarioCriado);
    }
    async autenticacaoLogin(dados) {
        const { email, senha } = dados;
        const usuarioEncontrado = await this._manager.findOne(entities_1.UsuarioEntity, {
            where: { email, senha },
        });
        if (!usuarioEncontrado)
            return undefined;
        return this.entityToModel(usuarioEncontrado);
    }
    async buscaUsuarioPorID(id) {
        const usuarioEncontrado = await this._manager.findOneBy(entities_1.UsuarioEntity, {
            id,
        });
        // const usuarios = await usuarioRepo.find(UsuarioEntity, {
        // 	where: {
        // 		email: ILike('leticia'),
        // 	},
        // });
        if (!usuarioEncontrado)
            return undefined;
        return this.entityToModel(usuarioEncontrado);
    }
    // TRANSFORMA RESULTADO DA BUSCA EM UMA INSTANCIA DA MODEL
    entityToModel(dadosDB) {
        return new models_1.Usuario(dadosDB.id, dadosDB.nome, dadosDB.email, dadosDB.senha);
    }
}
exports.UsuariosRepository = UsuariosRepository;
