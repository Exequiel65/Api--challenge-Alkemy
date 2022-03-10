let { check, body } = require('express-validator');

const db = require('../database/models');
const Users = db.User;


module.exports = [
    check('image')
    .notEmpty()
    .withMessage('Debes ingresar un image'),
    
    check('title')
    .notEmpty()
    .withMessage('Debes ingresar un nombre').bail()
    .isLength({
        min: 3,
        max: 50
    })
    .withMessage('El titulo debe tener entre 3 y 50 caracteres'),

    check('date_create')
    .notEmpty()
    .withMessage('Debes ingresar una fecha').bail()
    .isDate()
    .withMessage('Ingrese una fecha valida'),

    check('ranking')
    .notEmpty()
    .withMessage('Debes escribir el ranking').bail()
    .isNumeric()
    .withMessage('Debes ingresar un numero valido'),

    body('ranking')
    .custom((value) => {
        if (value > 5 || value < 1) {
            return Promise.reject()
        } else{
            return Promise.resolve()
        }
     })
    .withMessage('Ingrese un numero del 1 al 5'),

    check('id_genre')
    .notEmpty()
    .withMessage('Debes escribir un genero').bail()
    .isNumeric()
    .withMessage('Debes ingresar un numero valido'),

    // body('id_genre')
    // .custom((value, {req})=>{
    //     db.Genre.findOne({
    //         where : {
    //             id : req.body.id_genre
    //         }
    //     })
    //     .then(genre =>{
    //         if (genre) {
    //             return Promise.resolve()
    //         }
    //     })
    //     .catch(() => {
    //         return Promise.reject("Igrese un genero valido")
    //     })
    // })

]