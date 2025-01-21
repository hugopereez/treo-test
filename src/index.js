'use strict';
const express = require('express')
const app = express()
const port = 3000

// Endpoint abierto
app.get('/status', (req, res) => {
    return res.send({ status: 'ok' });
});

app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));

app.listen(port, () => {
    console.log(`Running on ${port}`)
});