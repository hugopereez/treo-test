const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const { sequelize } = require('../models');
const errorHandler = require('./middlewares/errorHandler');
const authMiddlewares = require('./middlewares/authMiddlewares');

app.use(bodyParser.json());

// Endpoint abierto
app.get('/status', (req, res) => {
    return res.send({ status: 'ok' });
});

// Rutas separadas, con middleware de autenticación en todos los users (aunque solo es uno)
app.use('/users', authMiddlewares.validateAuthentication, require('./routes/users'));

// Ruta abierta para autenticación
app.use('/auth', require('./routes/auth'));

// Middleware de error global
app.use(errorHandler);

// Validar conexión a la base de datos y levantar servidor
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