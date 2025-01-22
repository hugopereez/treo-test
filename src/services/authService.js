const dotenv = require('dotenv');
dotenv.config();
const AppError = require('../utils/AppError');
const userService = require('./userService');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const token = jwt.sign({ username: user.username, name: `${user.firstName} ${user.lastName}` }, process.env.TOKEN_SECRET, { expiresIn: '3d' });
    return token;
}

const decodeToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        return decoded;
    } catch (error) {
        throw new AppError('Invalid token', 401);
    }
}

const login = async({ username, password }) => {
    if (!username || !password) {
        throw new AppError('Username and password are required', 400);
    }

    const user = await userService.getUser(username, true);
    if (!user || (user.password != password)) {
        throw new AppError('Invalid username or password', 401); // Prefiero dejarlo asi para no dar pistas a un atacante
    }

    const token = generateToken(user);
    return { token };
};

module.exports = {
    login,
    decodeToken
}