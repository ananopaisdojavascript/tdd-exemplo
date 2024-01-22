// Importação da função para o teste
const calculaValor = require("../src/calcula-valor.js")
require("./extensoes")

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

describe("calcular prestações", () => {
  it("O número de parcelas é igual ao número de prestações", () => {
    // Premissa
    const numeroPrestacoes = 6
    // Operação
    const prestacoes = calculaValor.calcularPrestacoes(200, numeroPrestacoes)
    // Resultado esperado
    expect(prestacoes.length).toEqual(numeroPrestacoes)
  })

  it("O valor de uma única prestação é igual ao montante", () => {
    const numeroPrestacoes = 1
    const prestacoes = calculaValor.calcularPrestacoes(50, numeroPrestacoes)
    expect(prestacoes.length).toEqual(numeroPrestacoes)
    expect(prestacoes[0]).toEqual(50)
  })

  it("O valor de duas prestações é igual à metade do montante", () => {
    const numeroPrestacoes = 2
    const prestacoes = calculaValor.calcularPrestacoes(50, numeroPrestacoes)
    expect(prestacoes.length).toEqual(numeroPrestacoes)
    expect(prestacoes[0]).toEqual(25)
    expect(prestacoes[1]).toEqual(25)
  })

  // it.only ou test.only - considera apenas um único teste
  // it.skip ou test.skip - pula um teste
  it("O valor da soma das prestaçoes deve ser igual ao montante com duas casas decimais", () => {
    // Dado que (given)
    const numeroPrestacoes = 3
    const montante = 100
    // Quando (when)
    const prestacoes = calculaValor.calcularPrestacoes(montante, numeroPrestacoes)
    // Então (then)
    expect(prestacoes.length).toEqual(numeroPrestacoes)
    expect(prestacoes).sejaDecrescente()
    expect(prestacoes).terSomaDeValoresIgual(montante)

  })

  it("Desafio semi-final", () => {
    // Given
    const numeroPrestacoes = 3
    const montante = 101.994
    // Quando (when)
    const prestacoes = calculaValor.calcularPrestacoes(montante, numeroPrestacoes)
    // Então (then)
    expect(prestacoes.length).toEqual(numeroPrestacoes)
    expect(prestacoes).terSomaDeValoresIgual(montante)
    expect(prestacoes).sejaDecrescente()

  })
})

// Debug: node --inspect-brk .\node_modules\jest\bin\jest.js --runInBand