type AtualizarRecadoDTO = {
  titulo?: string;
  recado?: string;
  criado_em: Date;
};

export type RecadoJSON = {
  titulo?: string;
  recado?: string;
  criado_em: Date;
  criado_por: string;
};

export class Recado {
  private _criado_em: Date;

  constructor(
    private _criado_por: string,
    private _titulo?: string,
    private _recado?: string
  ) {
    this._criado_em = new Date();
  }

  public toJSON(): RecadoJSON {
    return {
      titulo: this._titulo,
      recado: this._recado,
      criado_em: this._criado_em,
      criado_por: this._criado_por,
    };
  }

  public atualizarRecado(novasInfos: AtualizarRecadoDTO): boolean {
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

    if (novasInfos.criado_em) {
      this._criado_em = novasInfos.criado_em;
    }

    return true;
  }
}
