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
var _Recado_id, _Recado_titulo, _Recado_recado, _Recado_criadoPor, _Recado_criadoEm, _Recado_arquivado;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recado = void 0;
const crypto_1 = require("crypto");
class Recado {
    constructor(dados) {
        _Recado_id.set(this, void 0);
        _Recado_titulo.set(this, void 0);
        _Recado_recado.set(this, void 0);
        _Recado_criadoPor.set(this, void 0);
        _Recado_criadoEm.set(this, void 0);
        _Recado_arquivado.set(this, void 0);
        __classPrivateFieldSet(this, _Recado_id, (0, crypto_1.randomUUID)(), "f");
        __classPrivateFieldSet(this, _Recado_titulo, dados.titulo, "f");
        __classPrivateFieldSet(this, _Recado_recado, dados.recado, "f");
        __classPrivateFieldSet(this, _Recado_criadoPor, dados.criadoPor, "f");
        __classPrivateFieldSet(this, _Recado_criadoEm, new Date().toLocaleDateString(), "f");
        __classPrivateFieldSet(this, _Recado_arquivado, false, "f");
    }
    toJSON() {
        const objRecado = {
            id: __classPrivateFieldGet(this, _Recado_id, "f"),
            titulo: __classPrivateFieldGet(this, _Recado_titulo, "f"),
            recado: __classPrivateFieldGet(this, _Recado_recado, "f"),
            criadoPor: __classPrivateFieldGet(this, _Recado_criadoPor, "f"),
            criadoEm: __classPrivateFieldGet(this, _Recado_criadoEm, "f"),
            arquivado: __classPrivateFieldGet(this, _Recado_arquivado, "f"),
        };
        return objRecado;
    }
    set novoTitulo(novoTitulo) {
        __classPrivateFieldSet(this, _Recado_titulo, novoTitulo, "f");
    }
    set novoRecado(novoRecado) {
        __classPrivateFieldSet(this, _Recado_recado, novoRecado, "f");
    }
    set switchArquivado(arquivar) {
        __classPrivateFieldSet(this, _Recado_arquivado, arquivar, "f");
    }
    set novaData(data) {
        __classPrivateFieldSet(this, _Recado_criadoEm, data, "f");
    }
}
exports.Recado = Recado;
_Recado_id = new WeakMap(), _Recado_titulo = new WeakMap(), _Recado_recado = new WeakMap(), _Recado_criadoPor = new WeakMap(), _Recado_criadoEm = new WeakMap(), _Recado_arquivado = new WeakMap();
