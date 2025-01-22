const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const { sequelize } = require('../models');
const errorHandler = require('./middlewares/errorHandler');
const authMiddlewares = require('./middlewares/authMiddlewares');

// Endpoint abierto
app.use(bodyParser.json());

app.get('/status', (req, res) => {
    return res.send({ status: 'ok' });
});

app.use('/users', authMiddlewares.validateAuthentication, require('./routes/users'));
app.use('/auth', require('./routes/auth'));

app.use(errorHandler);

sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    app.listen(port, () => {
      console.log(`Running on ${port}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });