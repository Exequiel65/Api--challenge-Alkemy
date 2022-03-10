let { check, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');
const Users = db.User;


module.exports = [
    check('email')
    .notEmpty()
    .withMessage('Debes ingresar un email').bail()
    .isEmail()
    .withMessage('Debes ingresar un email válido').bail(),

    
    check('password')
    .notEmpty()
    .withMessage('Debes escribir tu contraseña').bail()
    .isLength({
        min: 6,
        max: 12
    })
    .withMessage('La contraseña debe tener entre 6 y 12 caracteres'),

    body('password')
    .custom((value, {req}) => {
        return Users.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {      
            if(!bcrypt.compareSync(value, user.password)){
                return Promise.reject()
            }
        })
        .catch(() => {
            return Promise.reject("Email o contraseña invalidos")
        })
     })
]