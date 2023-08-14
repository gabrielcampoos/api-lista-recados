"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CriarRecado_dados;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriarRecado = void 0;
const repository_1 = require("../../repository");
class CriarRecado {
    constructor(dados) {
        _CriarRecado_dados.set(this, void 0);
        __classPrivateFieldSet(this, _CriarRecado_dados, dados, "f");
    }
    execute() {
        const repository = new repository_1.RecadosRepository();
        const usuarioExiste = repository.usuarioExiste(__classPrivateFieldGet(this, _CriarRecado_dados, "f").criadoPor);
        if (!usuarioExiste) {
            return {
                sucesso: false,
                mensagem: "Usuário não cadastrado?!",
            };
        }
        const retorno = repository.criarRecado(__classPrivateFieldGet(this, _CriarRecado_dados, "f"));
        if (!retorno) {
            return {
                sucesso: false,
                mensagem: "Recado não foi criado.",
            };
        }
        return {
            sucesso: true,
            mensagem: "Recado criado com sucesso",
            dadosRetornados: retorno,
        };
    }
}
exports.CriarRecado = CriarRecado;
_CriarRecado_dados = new WeakMap();
