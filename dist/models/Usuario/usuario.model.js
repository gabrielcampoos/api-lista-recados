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
var _Usuario_id, _Usuario_nome, _Usuario_email, _Usuario_senha;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const crypto_1 = require("crypto");
class Usuario {
    constructor(dados) {
        _Usuario_id.set(this, void 0);
        _Usuario_nome.set(this, void 0);
        _Usuario_email.set(this, void 0);
        _Usuario_senha.set(this, void 0);
        __classPrivateFieldSet(this, _Usuario_id, (0, crypto_1.randomUUID)(), "f");
        __classPrivateFieldSet(this, _Usuario_nome, dados.nome, "f");
        __classPrivateFieldSet(this, _Usuario_email, dados.email, "f");
        __classPrivateFieldSet(this, _Usuario_senha, dados.senha, "f");
    }
    toJSON() {
        const objUsuario = {
            id: __classPrivateFieldGet(this, _Usuario_id, "f"),
            nome: __classPrivateFieldGet(this, _Usuario_nome, "f"),
            email: __classPrivateFieldGet(this, _Usuario_email, "f"),
            senha: __classPrivateFieldGet(this, _Usuario_senha, "f"),
        };
        return objUsuario;
    }
    noPassword() {
        const objUsuario = {
            id: __classPrivateFieldGet(this, _Usuario_id, "f"),
            nome: __classPrivateFieldGet(this, _Usuario_nome, "f"),
            email: __classPrivateFieldGet(this, _Usuario_email, "f"),
        };
        return objUsuario;
    }
}
exports.Usuario = Usuario;
_Usuario_id = new WeakMap(), _Usuario_nome = new WeakMap(), _Usuario_email = new WeakMap(), _Usuario_senha = new WeakMap();
