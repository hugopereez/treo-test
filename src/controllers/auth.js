const authService = require('../services/authService');

const login = async (req, res, next) => {
    try {
        const userResponse = await authService.login(req.body);
        return res.json(userResponse);
    } catch (error) {
        next(error) // El error se maneja en el middleware errorHandler
    }
}

module.exports = {
    login
}

