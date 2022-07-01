const Router = require('express')
const router = new Router()
const taskController = require('../public/javascripts/task.controller')
const authMiddleware = require('../public/javascripts/authMiddleware')

router.get('/task', authMiddleware, taskController.get_tasks)
router.get('/task/:id', authMiddleware, taskController.get_one_task)
router.post('/task', authMiddleware, taskController.create_task)
router.put('/task', authMiddleware, taskController.update_task)
router.delete('/task/:id', authMiddleware, taskController.delete_task)


module.exports = router