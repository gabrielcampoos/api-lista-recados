"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheRepository = void 0;
const database_1 = require("../../../../main/database");
class CacheRepository {
    _redis = database_1.RedisConnection.connection;
    async get(chave) {
        const data = await this._redis.get(chave);
        if (!data)
            return null;
        return JSON.parse(data);
    }
    async set(chave, dado) {
        const dataString = JSON.stringify(dado);
        return this._redis.set(chave, dataString);
    }
    async delete(chave) {
        return this._redis.del(chave);
    }
}
exports.CacheRepository = CacheRepository;
