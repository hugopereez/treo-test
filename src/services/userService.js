const { User } = require('../../models');
const AppError = require('../utils/AppError');

const getUser = async(username, returnPassword = false) => {
    if (!username) {
        throw new AppError('Username is required', 400);
    }
    const user = await User.findOne({ where: { username } });
    if (!user) {
        throw new AppError('User not found', 404);
    }
    return {
        id: user.id,
        username: user.username,
        name: `${user.firstName} ${user.lastName}`,
        ...(returnPassword && { password: user.password })
    };
};

module.exports = {
    getUser
}