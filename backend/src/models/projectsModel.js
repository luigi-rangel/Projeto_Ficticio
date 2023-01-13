const uuidv4 = require('uuid').v4;
const client = require('./client');
const projectsUtils = require('../Utils/projectsUtils');
const usersModel = require('./usersModel');

const createProject = async (p, username) => {
    const db = client();

    const query = 'INSERT INTO project (id, title, zip_code, cost, done, deadline, userid, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    
    const uuid = uuidv4();
    const created_at = new Date().toISOString();
    const [user] = await usersModel.getUserByUsername(username);
    
    await db.connect();
    await db.query(query, [uuid, p.title, p.zip_code, p.cost, false, p.deadline, user.id, created_at]);
    await db.end();

    return;
};

const getProjects = async (username) => {
    const db = client();

    const query = 'SELECT P.id, title, zip_code, cost, done, deadline, username, created_at, updated_at FROM project P INNER JOIN users U ON P.userID=U.id WHERE U.username = $1 ORDER BY done, deadline;';

    await db.connect();
    const projects = await db.query(query, [username]);
    await db.end();

    return projects.rows;
};    

const getProjectByID = async (id, username) => {
    const db = client();

    const query = 'SELECT P.id, title, zip_code, cost, done, deadline, username, created_at, updated_at FROM project P INNER JOIN users U ON P.userid=U.id WHERE P.id = $1 AND username = $2';
    
    await db.connect();
    const res = await db.query(query, [id, username]);
    await db.end();

    const project = res.rows;

    if(project.length){
        project[0].location = await projectsUtils.getLocation(project[0].zip_code);
        project[0].zip_code = undefined;
    }
    
    return project;
};    

const updateProject = async (p, id, username) => {
    const db = client();

    const query = 'UPDATE project SET title=$1, zip_code=$2, cost=$3, deadline=$4, updated_at=$5 WHERE id = $6 AND userid IN (SELECT userid FROM users WHERE username= $7)';

    const updated_at = new Date().toISOString();

    await db.connect();
    await db.query(query, [p.title, p.zip_code, p.cost, p.deadline, updated_at, id, username]);
    await db.end();

    return;
};

const projectDone = async (id, username) => {
    const db = client();

    const query = 'UPDATE project SET done=true, updated_at=$1 WHERE id=$2 AND userid IN (SELECT userid FROM users WHERE username=$3)';

    const updated_at = new Date().toISOString();

    await db.connect();
    await db.query(query, [updated_at, id, username]);
    await db.end();

    return;
}

const deleteProject = async (id, username) => {
    const db = client();

    const query = 'DELETE FROM project WHERE id = $1 AND userid IN (SELECT userid FROM users WHERE username=$2)';

    await db.connect();
    await db.query(query, [id, username]);
    await db.end();

    return;
};    

module.exports = {
    createProject,
    getProjects,
    getProjectByID,
    updateProject,
    projectDone,
    deleteProject
}