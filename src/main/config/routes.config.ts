import { Express, Request, Response } from "express";

import rotasRecado from "../../app/features/recados/recados.routes";
import rotasUsuario from "../../app/features/usuarios/usuarios.routes";

export function rotasApp(app: Express) {
  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "OK" });
  });

  app.use("/usuarios", rotasUsuario);
  app.use("/recados", rotasRecado);
}
