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
var _CadastrarUsuario_dados;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CadastrarUsuario = void 0;
const repository_1 = require("../../repository");
class CadastrarUsuario {
    constructor(dados) {
        _CadastrarUsuario_dados.set(this, void 0);
        __classPrivateFieldSet(this, _CadastrarUsuario_dados, dados, "f");
    }
    execute() {
        const repository = new repository_1.UsuariosRepository();
        if (repository.emailExiste(__classPrivateFieldGet(this, _CadastrarUsuario_dados, "f").email)) {
            return {
                sucesso: false,
                mensagem: "Email já cadastrado.",
            };
        }
        const retorno = repository.cadastrarUsuario(__classPrivateFieldGet(this, _CadastrarUsuario_dados, "f"));
        return {
            sucesso: true,
            mensagem: "Usuário cadastrado com sucesso!",
            dadoCadastrado: retorno,
        };
    }
}
exports.CadastrarUsuario = CadastrarUsuario;
_CadastrarUsuario_dados = new WeakMap();
