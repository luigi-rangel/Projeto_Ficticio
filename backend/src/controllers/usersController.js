const usersModel = require('../models/usersModel');

const createUser = async (req, res) => {
    await usersModel.createUser(req.body);
    return res.status(201).json({status: 'ok', message: 'User created!'});
};

module.exports = {
    createUser
}