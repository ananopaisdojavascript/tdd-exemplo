// Importação da função para o teste
const calculaValor = require("../src/calcula-valor.js")

// describe: conjunto de testes
describe("calcular o montante", () => {
  // Teste da funcionalidade
  it("Com uma prestação, o montante é igual ao capital", () => {
    // Operação
    const montante = calculaValor.calcularMontante(100, 0.0175, 1)
    // Resultado ou comportamento esperado
    expect(montante).toEqual(100)
  })
  
  it("Com 4 prestações, o montante é acrescido de juros", () => {
    // Operação
    const montante = calculaValor.calcularMontante(500, 0.025, 4)
    // Resultado ou comportamento esperado
    expect(montante).toEqual(538.45)
    // .toBeCloseTo: arredonda um valor (útil para casos nos quais não exista um arredondamento de valor definido)
    // expect(montante).toBeCloseTo(538.45)
  })
})

describe("Arredondar", () => {
  it("Arredondar um valor em duas casas decimais", () => {
    const resultado = calculaValor.arredondar(538.4453124999998)
    expect(resultado).toEqual(538.45)
  })

  it("1.005 deve retornar 1.01", () => {
    const resultado = calculaValor.arredondar(1.005)
    expect(resultado).toEqual(1.01)
  })
})