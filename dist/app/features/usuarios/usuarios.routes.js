"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("./controllers");
const validators_1 = require("./validators");
// const usuarioRoutes = express.Router();
// usuarioRoutes.post(
//   "/cadastro",
//   validarDadosUsuario,
//   UsuariosController.cadastrar
// );
// usuarioRoutes.post("/login", validarDadosUsuario, UsuariosController.logar);
// export default usuarioRoutes;
exports.default = () => {
    const router = (0, express_1.Router)();
    router.post("/usuarios", validators_1.validarDadosUsuario, controllers_1.UsuariosController.cadastrar);
    router.post("/login", validators_1.validarDadosUsuario, controllers_1.UsuariosController.logar);
    return router;
};
