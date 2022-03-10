const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController')
let loginValidator = require('../validations/login')
let registerValidator = require('../validations/register')

router.post('/login', loginValidator,controller.processLogin)
router.post('/register', registerValidator, controller.processRegister)






module.exports = router