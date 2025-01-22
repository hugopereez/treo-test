const userService = require('../services/userService');

const getMe = async (req, res, next) => {
    try {
        const response = await userService.getUser(req.user.username);
        return res.json(response);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getMe
}