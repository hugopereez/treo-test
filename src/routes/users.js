const express = require('express')
const router = express.Router()
const controllers = require('../controllers/users');

router.get('/me', controllers.getMe) // Conseguir información del usuario autenticado

module.exports = router;