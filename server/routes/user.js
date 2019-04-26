const router = require('express').Router()
const UserController = require('../controllers/UserController')
const {authentication} = require('../middleware/authentication')

router.get('/user', authentication, UserController.findById)
router.post('/signin', UserController.signInLocal)
router.post('/register', UserController.register)

module.exports = router