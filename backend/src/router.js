const express = require('express');

const pController = require('./controllers/projectsController');
const pUtils = require('./Utils/projectsUtils');

const uControllers = require('./controllers/usersController');
const uUtils = require('./Utils/usersUtils');

const router = express.Router();

router.post('/users', uUtils.validateBody(), uControllers.createUser);
router.post('/projects', pUtils.validateBody(), pUtils.validateHeaders(), pController.createProject);

router.get('/projects', pUtils.validateHeaders(), pController.getProjects);
router.get('/project/', pController.getProjectByID);

router.put('/projects/:id', pUtils.validateBody(['title', 'zip_code', 'deadline']), pUtils.validateHeaders(), pController.updateProject);

router.patch('/projects/:id/done', pUtils.validateHeaders(), pController.projectDone);

router.delete('/projects/:id', pUtils.validateHeaders(), pController.deleteProject);

module.exports = router