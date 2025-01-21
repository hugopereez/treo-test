'use strict';

export const getMe = async (req, res) => {
    return res.send({ message: 'Hello World' });
}