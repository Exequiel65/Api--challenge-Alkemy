let { check, body } = require('express-validator');

const db = require('../database/models');
const Users = db.User;


module.exports = [
    check('image')
    .notEmpty()
    .withMessage('Debes ingresar un image'),
    
    check('name')
    .notEmpty()
    .withMessage('Debes ingresar un nombre').bail()
    .isLength({
        min: 3,
        max: 50
    })
    .withMessage('El nombre debe tener entre 3 y 50 caracteres'),

    check('age')
    .notEmpty()
    .withMessage('Debes ingresar una edad').bail()
    .isNumeric()
    .withMessage('Ingrese una numero valido'),

    check('weigth')
    .notEmpty()
    .withMessage('Debes escribir el peso').bail()
    .isNumeric()
    .withMessage('Debes ingresar un numero valido'),

    check('history')
    .notEmpty()
    .withMessage('Debes escribir un genero')



]