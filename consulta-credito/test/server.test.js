const supertest = require('supertest');

const request = supertest('http://localhost:3000');

it('Servidor rodando na porta 3000', async () => {
  const resposta = await request.get('/');
  expect(resposta.status).toEqual(200);
});
