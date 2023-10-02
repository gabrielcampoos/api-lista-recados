"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const typeorm_1 = require("typeorm");
const envs_1 = require("../../app/envs");
const ehProducao = envs_1.appEnvs.ambiente === "producao";
const rootDir = ehProducao ? "dist" : "src";
exports.default = new typeorm_1.DataSource({
    type: "postgres",
    url: envs_1.appEnvs.dbURL,
    schema: "public",
    entities: [rootDir + "/app/shared/database/entities/**/*"],
    migrations: [rootDir + "/app/shared/database/migrations/**/*"],
    synchronize: false,
    ssl: {
        rejectUnauthorized: false,
    },
});
