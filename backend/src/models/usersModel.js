const uuidv4 = require('uuid').v4;
const client = require('./client');

const createUser = async (user) => {
    const db = client();

    const query = 'INSERT INTO users (id, name, username, password) VALUES ($1, $2, $3, $4)';

    const uuid = uuidv4();

    await db.connect();
    await db.query(query, [uuid, user.name, user.username, user.password]);
    await db.end();

    return;
}

const getUserByUsername = async (username) => {
    const db = client();

    const query = 'SELECT * FROM users WHERE username = $1';

    await db.connect();
    user = await db.query(query, [username]);
    await db.end();

    return user.rows;
}

const getUserByUsernameAndPassword = async (username, password) => {
    const db = client();

    const query = 'SELECT name, username, password FROM users WHERE username=$1 AND password=$2';

    await db.connect();
    user = await db.query(query, [username, password]);
    await db.end();

    return user.rows;
}

module.exports = {
    createUser,
    getUserByUsername,
    getUserByUsernameAndPassword
}