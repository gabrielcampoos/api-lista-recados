"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const Base_1 = require("./Base");
class Usuario extends Base_1.Base {
    _nome;
    _email;
    _senha;
    constructor(id, _nome, _email, _senha) {
        super(id);
        this._nome = _nome;
        this._email = _email;
        this._senha = _senha;
    }
    toJSON() {
        return {
            id: this._id,
            nome: this._nome,
            email: this._email,
        };
    }
}
exports.Usuario = Usuario;
/*

*/
