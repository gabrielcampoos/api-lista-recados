"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarIdRecado = void 0;
function validarIdRecado(req, res, next) {
    const id = req.params.id;
    if (!id) {
        return res.status(401).json({
            mensagem: "Necessário informar o id do usuário logado/emissor do recado.",
        });
    }
    if (typeof id !== "string" || id === "") {
        return res
            .status(401)
            .json({ mensagem: "O id do usuario não corresponde ao esperado." });
    }
    next();
}
exports.validarIdRecado = validarIdRecado;
