const express = require('express')
const {allTasksHandler,taskDetailHandler,newTaskHandler,authenticateHandler,taskDoneHandler} = require('./mainController')

const router = express.Router()

// this middleware will authorize if user is allowed to access these tasks
// router.use("authorization middleware");
// authenticate middleware
router.use(authenticateHandler);
// this route gives us all tasks 
router.get('/', allTasksHandler);
// this route will give us detail of particular task
router.get('/tasks/detail/:taskid',taskDetailHandler);
// this route will update detail of particular task
router.get('/tasks/update/:taskid',taskDoneHandler);
// this route will create new task
router.post('/tasks/new',newTaskHandler);

module.exports = router;