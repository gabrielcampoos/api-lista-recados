"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const models_1 = require("./app/models");
const database_1 = require("./main/database");
async function teste() {
    await database_1.RedisConnection.connect();
    const redis = database_1.RedisConnection.connection;
    redis.set("nome", "João da Silva");
    redis.set("idade", 27);
    console.log(await redis.get("nome"));
    await redis.del("nome");
    console.log(await redis.get("nome"));
    console.log(await redis.get("idade"));
    const usuario = new models_1.Usuario((0, crypto_1.randomUUID)(), "Gabriel", "teste@teste.com", "admin");
    redis.set("usuario-1", JSON.stringify(usuario.toJSON()));
    const usuarioCache = await redis.get("usuario-1");
    console.log(JSON.parse(usuarioCache ?? "{}"));
}
teste();
