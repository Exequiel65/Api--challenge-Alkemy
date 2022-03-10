const db = require('../database/models')
const bcrypt = require('bcryptjs')
const nodemailer = require('../path/nodemailer')
let { validationResult } = require('express-validator');

let controller = {
    processLogin : (req, res)=>{
        let errors = validationResult(req)

        if (errors.isEmpty()) {
            let {email, password} = req.body
            db.User.findOne({
                where : {
                    email : email
                }
            })
            .then(user =>{
                req.session.user = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                };

                res.locals.user = req.session.user;
                
                res.status(200).json({
                    meta : {
                        status : 200,
                        login : "success",
                    },
                    data : user
                })
                
            })
            .catch(error => res.status(500).json({
                meta : {
                    status : 500,
                    login : "failure",
                    message : "Error login a user",
                    redirect : "/auth/register"
                },
                error
            }))
        } else {
            res.status(500).json({
                meta : {
                    status : 500,
                    register : "failure",
                    message : "Error loging a user"
                },
                errors : errors.mapped()
            })
        }


        
    },
    processRegister : (req, res)=>{
        let errors = validationResult(req)

        if (errors.isEmpty()) {
            let {name, email, password} = req.body
            db.User.create({
                name,
                email,
                password : bcrypt.hashSync(password, 10)
            })
            .then(user =>{
                req.session.user = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                };

                res.locals.user = req.session.user;
                remitent = email
                message = "<h1>Bienvenido</h1> <br> <p>Gracias por registrarte</p>"
                nodemailer(email, message)
                res.status(200).json({
                    meta : {
                        status : 200,
                        register : "success",
                    },
                    data : user
                })
            })
            .catch(error => res.status(500).json({
                meta : {
                    status : 500,
                    register : "failure",
                    message : "Error registering a user"
                },
                error
            }))
        } else {
            res.status(500).json({
                meta : {
                    status : 500,
                    register : "failure",
                    message : "Error registering a user"
                },
                errors : errors.mapped()
            })
        }


        
    }
}

module.exports = controller