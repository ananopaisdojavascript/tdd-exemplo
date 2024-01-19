function calcularMontante(capital, taxa, periodo) {
  let montante = capital * Math.pow((1 + taxa), periodo - 1)
  montante = arredondar(montante)
  return montante
}

function arredondar(valor) {
  return Math.round((valor + Number.EPSILON) * 100) / 100
}

module.exports = { calcularMontante, arredondar }