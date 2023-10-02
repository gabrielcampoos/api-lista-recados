"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRoutes = void 0;
const recados_routes_1 = __importDefault(require("../../app/features/recados/recados.routes"));
const usuarios_routes_1 = __importDefault(require("../../app/features/usuarios/usuarios.routes"));
const makeRoutes = (app) => {
    app.use((0, usuarios_routes_1.default)(), (0, recados_routes_1.default)());
};
exports.makeRoutes = makeRoutes;
