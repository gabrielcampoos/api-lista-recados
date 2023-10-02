"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base = void 0;
class Base {
    _id;
    constructor(_id) {
        this._id = _id;
    }
    toJSON() {
        // a lógica de execução vai ficar nas subclasses
    }
}
exports.Base = Base;
