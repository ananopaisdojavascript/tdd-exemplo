// Importação da função para o teste
const calculaValor = require("../src/calcula-valor.js")

// Teste da funcionalidade
it("Com uma prestação, o montante é igual ao capital", () => {
  // Operação
  const montante = calculaValor.calcularMontante(100, 0.0175, 1)
  // Resultado ou comportamento esperado
  expect(montante).toEqual(100)
})