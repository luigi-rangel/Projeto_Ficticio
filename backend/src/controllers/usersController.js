const usersModel = require('../models/usersModel');

const createUser = async (req, res) => {
    await usersModel.createUser(req.body);
    return res.status(201).json({status: 'ok', message: 'User created!'});
};

const getUser = async (req, res) => {
    const { username, password } = req.query;
    const user = await usersModel.getUserByUsernameAndPassword(username, password);

    if(!user.length){
        return res.status(404).json({status: 'error', message: 'no user found with given \'username\' and \'password\''});
    }

    return res.status(200).json({status: 'ok', data: user});
}

module.exports = {
    createUser,
    getUser
}