"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const controllers_1 = require("./controllers");
const middlewares_1 = require("./middlewares");
const app = (0, express_1.default)();
const controllerUser = new controllers_1.UsuariosController();
// torna desnecessario a utilizacao do JSON.parse() e JSON.stringify()
app.use(express_1.default.json());
// converte os codigos unicode enviados na rota para o respectivo caracter
// Ex: %20 => ' '
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.listen(process.env.PORTA, () => {
    console.log(`Servidor rodando na porta ${process.env.PORTA}`);
});
// AS DEFINIÇÕES DAS ROTAS
app.get("/", (request, response) => {
    return response.json("API LISTA DE RECADOS NO AR 🚀");
});
// ========================================================================================================
// USUÁRIOS
app.post("/usuarios/cadastrar", middlewares_1.validarDadosUsuario, controllerUser.cadastrar);
app.post("/usuarios/logar", middlewares_1.validarLogin, controllerUser.logar);
// RECADOS
const controllerRecados = new controllers_1.RecadosController();
app.post("/recados", 
// validarDadosUsuario,
middlewares_1.validarCamposRecados, controllerRecados.criar);
app.get("/recados/:idUsuario", controllerRecados.listarTodos);
app.put("/recados/editar/:idUsuario", middlewares_1.validarTipagem, controllerRecados.editar);
app.delete("/recados/:id", middlewares_1.validarIdRecado, controllerRecados.excluir);
