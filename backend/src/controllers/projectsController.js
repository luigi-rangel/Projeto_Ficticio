const projectsModel = require('../models/projectsModel');

const createProject = async (req, res) => {
    const { username } = req.headers;

    await projectsModel.createProject(req.body, username);
    return res.status(201).json({status: 'ok', message: 'Project created!'});
};

const getProjects = async (req, res) => {
    const { username } = req.headers;

    const projects = await projectsModel.getProjects(username);

    return res.status(200).json({status: 'ok', data: projects});
};    

const getProjectByID = async (req, res) => {
    const { id } = req.query;
    const { username } = req.headers;

    const project = await projectsModel.getProjectByID(id, username);

    return res.status(200).json({status: 'ok', data: project});
};    

const updateProject = async (req, res) => {
    const { id } = req.params;
    const { username } = req.headers;

    await projectsModel.updateProject(req.body, id, username);
    
    return res.status(204).json();
}

const projectDone = async (req, res) => {
    const { id } = req.params;
    const { username } = req.headers;

    await projectsModel.projectDone(id, username);
    
    return res.status(204).json();
}

const deleteProject = async (req, res) => {
    const { id } = req.params;
    const { username } = req.headers;

    await projectsModel.deleteProject(id, username);
    
    return res.status(204).json();
}

module.exports = {
    createProject,
    getProjects,
    getProjectByID,
    updateProject,
    projectDone,
    deleteProject
};