"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarIdUsuario = void 0;
function validarIdUsuario(req, res, next) {
    const { criadoPor } = req.body;
    if (!criadoPor) {
        return res.status(401).json({
            mensagem: "Necessário informar o id do usuário logado/emissor do recado.",
        });
    }
    if (typeof criadoPor !== "string" || criadoPor === "") {
        return res
            .status(401)
            .json({ mensagem: "O id do usuario não corresponde ao esperado." });
    }
    next();
}
exports.validarIdUsuario = validarIdUsuario;
