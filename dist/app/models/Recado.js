"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recado = void 0;
const _1 = require(".");
class Recado extends _1.Base {
    _criadoPor;
    _titulo;
    _recado;
    _criadoEm;
    constructor(id, _criadoPor, _titulo, _recado) {
        super(id);
        this._criadoPor = _criadoPor;
        this._titulo = _titulo;
        this._recado = _recado;
        this._criadoEm = new Date();
    }
    toJSON() {
        return {
            id: this._id,
            titulo: this._titulo,
            recado: this._recado,
            criadoEm: this._criadoEm,
            criadoPor: this._criadoPor,
        };
    }
    atualizarRecado(novasInfos) {
        if (novasInfos.titulo) {
            if (novasInfos.titulo?.length < 0) {
                return false;
            }
            this._titulo = novasInfos.titulo;
        }
        if (novasInfos.recado) {
            if (novasInfos.recado.length < 0) {
                return false;
            }
            this._recado = novasInfos.recado;
        }
        if (novasInfos.criadoEm) {
            this._criadoEm = novasInfos.criadoEm;
        }
        return true;
    }
}
exports.Recado = Recado;
