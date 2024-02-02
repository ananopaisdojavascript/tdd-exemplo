function arredondar(valor) {
  return Math.round((valor + Number.EPSILON) * 100) / 100;
}

function calcularMontante(capital, taxa, periodo) {
  let montante = capital * (1 + taxa) ** (periodo - 1);
  montante = arredondar(montante);
  return montante;
}

function calcularPrestacoes(montante, numeroParcelas) {
  const prestacaoBase = arredondar(montante / numeroParcelas);
  const resultado = Array(numeroParcelas).fill(prestacaoBase);
  let somaPrestacoes = resultado.reduce((atual, total) => atual + total);
  let diferenca = arredondar(montante - somaPrestacoes);
  const fator = diferenca > 0 ? 1 : -1;
  let i = diferenca > 0 ? 0 : resultado.length - 1;
  while (diferenca !== 0) {
    resultado[i] = arredondar(resultado[i] + (0.01 * fator));
    somaPrestacoes = resultado.reduce((atual, total) => atual + total);
    diferenca = arredondar(montante - somaPrestacoes);
    i += fator;
  }
  return resultado;
}

module.exports = { calcularMontante, arredondar, calcularPrestacoes };
