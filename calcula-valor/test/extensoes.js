const calculaValor = require("../src/calcula-valor.js")

expect.extend({
  terSomaDeValoresIgual(items, soma) {
    const somaReal = calculaValor.arredondar(items.reduce((atual, total) => atual + total))
    const passou = somaReal === calculaValor.arredondar(soma)

    return {
      message: () => `A soma ${somaReal} deve ser igual a ${soma}`,
      pass: passou
    }
  },

  sejaDecrescente(items) {
    for (let index = 0; index < items.length - 1; index++) {
      const j = index + 1
      expect(items[index]).toBeGreaterThanOrEqual(items[j])

      if (items[index] < items[j]) {
        return {
          message: () => `O vetor deve estar em ordem decrescente`,
          pass: false
        }
      }
    }

    return {
      message: () => `O vetor deve estar em ordem decrescente`,
      pass: true
    }
  }
})