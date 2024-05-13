const express =require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')

router.get('/login', AuthController.login)
router.get('/loginPost', AuthController.loginPost)
router.get('/register', AuthController.register)
router.get('/loginPost', AuthController.registerPost)

module.exports = router;
