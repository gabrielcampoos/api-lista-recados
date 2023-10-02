"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recados_controller_1 = require("./controllers/recados.controller");
// const recadosRoutes = express.Router();
// routerRecados.post("/recados", RecadosController.criar);
// routerRecados.get("/recados", RecadosController.listarTodos);
// routerRecados.put("/:idRecado", RecadosController.editar);
// routerRecados.delete("/:idRecado", RecadosController.deletar);
// export default routerRecados;
exports.default = () => {
    const router = (0, express_1.Router)();
    router.post("/recados", recados_controller_1.RecadosController.criar);
    router.get("/recados", recados_controller_1.RecadosController.listarTodos);
    router.put("/:idRecado", recados_controller_1.RecadosController.editar);
    router.delete("/:idRecado", recados_controller_1.RecadosController.deletar);
    return router;
};
