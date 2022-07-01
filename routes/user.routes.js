const Router = require('express')
const router = new Router()
const userController = require('../public/javascripts/user.controller')
const authMiddleware = require('../public/javascripts/authMiddleware')

router.post('/user', userController.create_user)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)

module.exports = router