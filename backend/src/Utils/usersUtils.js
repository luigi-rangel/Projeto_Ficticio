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
        return res.status(400).json({status: 'error', message: message})
    }

    next();
};

module.exports = {
    validateBody
}