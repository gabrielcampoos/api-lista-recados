"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const ioredis_1 = require("ioredis");
const envs_1 = require("../../app/envs");
exports.redis = new ioredis_1.Redis(envs_1.appEnvs.redisUrl);
