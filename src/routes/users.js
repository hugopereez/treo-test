const express = require('express')
const router = express.Router()
const controllers = require('../controllers/users');

router.get('/me', controllers.getMe)

module.exports = router;