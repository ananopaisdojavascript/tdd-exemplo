const request = require('supertest');
const app = require('../src/app');
const db = require('../src/db');

describe('Testes de integração', () => {
  beforeEach(async () => {
    db.cliente.destroy({ where: {} });
    db.consulta.destroy({ where: {} });
  });

  afterAll(async () => db.sequelize.close());

  const clienteJoao = {
    Nome: 'João Silva',
    CPF: '000.000.000-00',
  };

  const resultadoEsperado = {
    montante: 106.9,
    juros: 0.025,
    parcelas: 3,
    primeiraPrestacao: 35.64,
    prestacoes: [35.64, 35.63, 35.63],
  };

  const payloadRequest = {
    nome: clienteJoao.Nome,
    CPF: clienteJoao.CPF,
    valor: 101.75,
    parcelas: 3,
  };

  it('responder http 200 na raiz - Versão 01', () => request(app).get('/')
    .then((res) => expect(res.status).toBe(200)));

  it('responder http 200 na raiz - Versão 02', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
  });

  it('CENÁRIO 01', async () => {
    const res = await request(app)
      .post('/consulta-credito')
      .send(payloadRequest);

    // Resultado é obtido com sucesso
    expect(res.body.erro).toBeUndefined();
    expect(res.body.montante).toBe(106.9);
    expect(res.status).toBe(201);
    expect(res.body).toMatchSnapshot(resultadoEsperado);
    expect(res.body).toMatchObject(resultadoEsperado);

    // Cliente foi armazenado
    const cliente = await db.cliente.findOne({ where: { CPF: clienteJoao.CPF } });
    expect(cliente.CPF).toBe(clienteJoao.CPF);

    const consulta = await db.consulta.findOne({ where: { ClienteCPF: clienteJoao.CPF } });
    expect(consulta.Valor).toBe(101.75);
  });

  it('CENÁRIO 02', async () => {
    await db.cliente.create(clienteJoao);
    await db.consulta.create({
      Valor: 1,
      NumPrestacoes: 3,
      Juros: 0.5,
      Prestacoes: '1, 1',
      ClienteCPF: clienteJoao.CPF,
      Montante: 2,
      createdAt: '2016-06-22 19:10:25-07',
    });

    const res = await request(app)
      .post('/consulta-credito')
      .send(payloadRequest);
    expect(res.body).toMatchSnapshot(resultadoEsperado);
    expect(res.status).toBe(201);

    const count = await db.consulta.count({ where: { ClienteCPF: clienteJoao.CPF } });
    expect(count).toBe(2);
  });

  it('CENÁRIO 03', async () => {
    const res1 = await request(app)
      .post('/consulta-credito')
      .send(payloadRequest);

    expect(res1.body).toMatchSnapshot(resultadoEsperado);

    const res2 = await request(app)
      .post('/consulta-credito')
      .send(payloadRequest);

    // Resultado é obtido
    expect(res2.body.erro).toBeDefined();
    expect(res2.status).toBe(405);
  });

  it('CENÁRIO 04', async () => {
    const res = await request(app)
      .post('/consulta-credito')
      .send({});

    // Resultado é obtido
    expect(res.body.erro).toBeDefined();
    expect(res.status).toBe(400);
  });
});
