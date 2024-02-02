const app = require('./app');
const db = require('./db');

db.sequelize.sync().then(async () => {
  // eslint-disable-next-line no-console
  await console.log('Conectado ao banco de dados');
});

const port = 3000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Servidor funcionando!');
});
