const exemploMock = require("../src/exemplo-mock.js")

it("Exemplo 1 - mock callback", async () => {
  // Given
  let pessoas = new Array(3)

  pessoas[0] = {
    nome: "João", idade: 19
  }

  pessoas[1] = {
    nome: "José", idade: 17
  }

  pessoas[2] = {
    nome: "Maria", idade: 18
  }

  const mockCallback = jest.fn(p => p.idade)

  // When
  exemploMock.realizarParaAdultos(pessoas, mockCallback)
  
  // Then

  // Quantas vezes o "mock" foi chamado
  expect(mockCallback.mock.calls.length).toBe(2)

  // Verifica se o parâmetro chamado foi o primeiro nome do vetor pessoas (João)
 expect(mockCallback.mock.calls[0][0]).toEqual(pessoas[0])

  // Verifica se o resultado é a idade do João
  expect(mockCallback.mock.results[0].value).toEqual(pessoas[0].idade)


  expect(mockCallback.mock.calls[1][0]).toEqual(pessoas[2])
  expect(mockCallback.mock.results[1].value).toEqual(pessoas[2].idade)
})

test('Teste 02 - Mock Timer', (done) => {
  jest.useFakeTimers();

  const mockCallback = jest.fn(() => done());

  exemploMock.aguardarTimer(mockCallback);

  jest.advanceTimersByTime(1000);
  expect(mockCallback).toHaveBeenCalledTimes(0);

  jest.advanceTimersByTime(3000);
  expect(mockCallback).toHaveBeenCalledTimes(1);
});

afterEach(() => {
  jest.useRealTimers();
});