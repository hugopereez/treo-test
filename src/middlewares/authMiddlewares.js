const AppError = require('../utils/AppError');
const authService = require('../services/authService');

const validateAuthentication = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return next(new AppError('No token provided', 403));
    }
    const userDecoded = authService.decodeToken(token);
    if (!userDecoded) {
        return next(new AppError('Invalid token', 403));
    }
    req.user = userDecoded; // Guardamos el usuario decodificado en el request
    next();
}

module.exports = {
    validateAuthentication
}