export type UsuarioJSON = {
  nome: string;
  email: string;
};

export class Usuario {
  constructor(
    private _nome: string,
    private _email: string,
    private _senha: string
  ) {}

  public toJSON(): UsuarioJSON {
    return {
      nome: this._nome,
      email: this._email,
    };
  }
}

/*

*/
