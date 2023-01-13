const express = require('express');
const cors = require('cors');

const pController = require('./controllers/projectsController');
const pUtils = require('./Utils/projectsUtils');

const uController = require('./controllers/usersController');
const uUtils = require('./Utils/usersUtils');

const router = express.Router();

router.use(cors());

router.post('/users', uUtils.validateBody(), uUtils.checkUserExists(), uController.createUser);
router.post('/project', pUtils.validateBody(), pUtils.validateHeaders(), pController.createProject);

router.get('/projects', pUtils.validateHeaders(), pController.getProjects);
router.get('/project/', pController.getProjectByID);
router.get('/user', uUtils.validateQuery(), uController.getUser);

router.put('/projects/:id', pUtils.validateBody(), pUtils.validateHeaders(), pController.updateProject);

router.patch('/projects/:id/done', pUtils.validateHeaders(), pController.projectDone);

router.delete('/projects/:id', pUtils.validateHeaders(), pController.deleteProject);

module.exports = router