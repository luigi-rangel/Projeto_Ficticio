const usersModel = require('../models/usersModel');

const validateBody = (fields = ['name', 'username', 'password']) => (req, res, next) => {
    let valid = true;
    let message = [];

    const { body } = req;
    for(let item in fields){
        if(!(fields[item] in body && body[fields[item]])){
            valid = false;
            message.push(`field ${fields[item]} is required and can not be empty.`);
        }
    }

    if(!valid){
        return res.status(400).json({status: 'error', message: message});
    }

    next();
};

const checkUserExists = () => async (req, res, next) => {
    const { body } = req;
    const user = await usersModel.getUserByUsername(body.username);

    if(user.length !== 0){
        return res.status(422).json({status: 'error', message: [`username ${body.username} already taken.`]});
    }

    next();
}

const validateQuery = (fields = ['username', 'password']) => (req, res, next) => {
    let valid = true;
    let message = [];

    const { query } = req;
    for(let item in fields){
        if(!(fields[item] in query && query[fields[item]])){
            valid = false;
            message.push(`field ${fields[item]} is required and can not be empty.`);
        }
    }

    if(!valid){
        return res.status(400).json({status: 'error', message: message});
    }

    next();
}

module.exports = {
    validateBody,
    validateQuery,
    checkUserExists
}