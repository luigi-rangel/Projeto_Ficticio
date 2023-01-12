const https = require('https');

const validateBody = (fields = ['title', 'zip_code', 'cost', 'deadline']) => (req, res, next) => {
    let valid = true;
    let message = [];

    const { body } = req;

    for(let item in fields){
        if(!(fields[item] in body && body[fields[item]])){
            valid = false;
            message.push(`field '${fields[item]}' is required and can not be empty.`);
        }
    }

    if(!valid){
        return res.status(400).json({status: 'error', message: message})
    }

    next();
};

const validateHeaders = () => (req, res, next) => {
    const { headers } = req;
    
    if(!('username' in headers && headers.username)){
        return res.status(400).json({status: 'error', message: ['header \'username\' is required and can not be empty.']})
    }
    next();
}

const getLocation = async (zip_code) => {
    const zip = zip_code.substring(0, 5) + '-' + zip_code.substring(5);
    const url = 'https://cdn.apicep.com/file/apicep/' + zip + '.json';
    
    const location = await new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let s = '';
            res.on('data', (chunk) => s += chunk);
            res.on('end', () => resolve(JSON.parse(s)));
        }).on('error', (e) => reject(e));
    });

    return location.city + ' - ' + location.state;
}

module.exports = {
    validateBody,
    validateHeaders,
    getLocation
}