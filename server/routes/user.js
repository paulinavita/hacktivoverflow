const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.post('/signin', UserController.signInLocal)
router.post('/register', UserController.register)


module.exports = router