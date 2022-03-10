const { check, body } = require('express-validator');
const db = require('../database/models');

const Users = db.User;

module.exports = [
    check('name')
    .notEmpty()
    .withMessage('El nombre es requerido'),

    check('email')
    .isEmail()
    .withMessage('Debes ingresar un email válido'),

    body('email').custom((value) => {
       return Users.findOne({
            where: {
                email:value,
            }
        })
        .then((user) =>{
            if(user){
                return Promise.reject('Email ya  registrado')
            }
        })
        
    }),

    check('password')
    .notEmpty()
    .withMessage('Debes escribir tu contraseña')
    .isLength({
        min: 6,
        max: 12
    })
    .withMessage('La contraseña debe tener entre 6 y 12 caracteres'),
]
//dsa
