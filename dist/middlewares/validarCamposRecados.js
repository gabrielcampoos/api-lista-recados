"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCamposRecados = void 0;
function validarCamposRecados(req, res, next) {
    const { titulo, recado } = req.body;
    if (!titulo) {
        return res.status(400).json({ mensagem: "Título não informado." });
    }
    if (typeof titulo !== "string") {
        return res
            .status(400)
            .json({ mensagem: "Título não corresponde ao esperado." });
    }
    if (!recado) {
        return res.status(400).json({ mensagem: "Recado sem corpo." });
    }
    if (typeof recado !== "string") {
        return res
            .status(400)
            .json({ mensagem: "Recado não corresponde ao esperado." });
    }
    next();
}
exports.validarCamposRecados = validarCamposRecados;
