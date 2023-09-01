import { Base } from ".";

type AtualizarRecadoDTO = {
  titulo: string;
  recado: string;
  criadoEm: Date;
};

export type RecadoJSON = {
  id: string;
  titulo: string;
  recado: string;
  criadoEm: Date;
  criadoPor: string;
};

export class Recado extends Base {
  private _criadoEm: Date;

  constructor(
    id: string,
    private _titulo: string,
    private _recado: string,
    private _criadoPor: string
  ) {
    super(id);
    this._criadoEm = new Date();
  }

  public toJSON(): RecadoJSON {
    return {
      id: this._id,
      titulo: this._titulo,
      recado: this._recado,
      criadoEm: this._criadoEm,
      criadoPor: this._criadoPor,
    };
  }

  public atualizarRecado(novasInfos: AtualizarRecadoDTO): boolean {
    if (novasInfos.titulo) {
      if (novasInfos.titulo.length < 0) {
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
