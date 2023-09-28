import express from "express";
import { RecadosController } from "./controllers/recados.controller";

const routerRecados = express.Router();

routerRecados.post("/recados", RecadosController.criar);

routerRecados.get("/recados", RecadosController.listarTodos);

routerRecados.put("/:idRecado", RecadosController.editar);

routerRecados.delete("/:idRecado", RecadosController.deletar);

export default routerRecados;
