import cors from "cors";
import "dotenv/config";
import express from "express";
import { RecadosController, UsuariosController } from "./controllers";
import {
  validarCamposRecados,
  validarDadosUsuario,
  validarIdRecado,
  validarLogin,
  validarTipagem,
} from "./middlewares";

const app = express();

const controllerUser = new UsuariosController();

// torna desnecessario a utilizacao do JSON.parse() e JSON.stringify()
app.use(express.json());

// converte os codigos unicode enviados na rota para o respectivo caracter
// Ex: %20 => ' '
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.listen(process.env.PORTA, () => {
  console.log(`Servidor rodando na porta ${process.env.PORTA}`);
});

// AS DEFINIÇÕES DAS ROTAS
app.get("/", (request, response) => {
  return response.json("API LISTA DE RECADOS NO AR 🚀");
});

// ========================================================================================================
// USUÁRIOS
app.post("/usuarios/cadastrar", validarDadosUsuario, controllerUser.cadastrar);

app.post("/usuarios/logar", validarLogin, controllerUser.logar);

// RECADOS
const controllerRecados = new RecadosController();

app.post(
  "/recados",
  // validarDadosUsuario,
  validarCamposRecados,
  controllerRecados.criar
);

app.get("/recados/:idUsuario", controllerRecados.listarTodos);

app.put("/recados/editar/:idUsuario", validarTipagem, controllerRecados.editar);

app.delete("/recados/:id", validarIdRecado, controllerRecados.excluir);
