class Calculadora {
  somar(num1: number, num2: number): number {
    return num1 + num2;
  }
}

describe("Testes do módulo/classe calculadora", () => {
  const createSut = () => {
    return new Calculadora();
  };

  test("Deve retornar 2 ao chamar o metodo somar enviando 1 e 1", () => {
    const sut = createSut();
    const resultado = sut.somar(1, 1);

    expect(resultado).toBe(2);
  });
});
