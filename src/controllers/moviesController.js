let db = require('../database/models')
let { validationResult } = require('express-validator')

let controller = {
    allMovies : (req, res)=>{
        let query = req.query
        let param = {}
        let order = query.order === "DESC" ? [["date_create", "DESC" ]] : [["date_create", "ASC" ]] 
        if (query.title) param['title'] = query.title;
        if (query.genre) param['id_genre'] = query.genre;
        

        db.Movie.findAll({
            attributes: ['image', 'title', 'date_create'],
            where : param,
            order : order
        })
        .then(movies =>{
            res.status(200).json({
                meta : {
                    status : 200,
                    search : "success",
                },
                data : movies
                
            })
        })
        .catch(error =>{
            res.status(500).json({
                meta : {
                    status : 500,
                    search : "failure",
                    message : "Error finding information"
                },
                error
            })
        })

    },
    detail : (req, res)=>{
        db.Movie.findByPk(req.params.id,
            {
                include : [{association : "characters"}]
            })
        .then(movie =>{
            res.status(200).json({
                meta : {
                    status : 200,
                    search : "success",
                },
                data : movie
            })
        })
        .catch(error =>{
            res.status(500).json({
                meta : {
                    status : 500,
                    search : "failure",
                    message : "Error finding information"
                },
                error
            })
        })
    },
    create : (req, res)=>{
        let errors = validationResult(req)
        if (errors.isEmpty()) {
            db.Movie.create({...req.body})
            .then((movie)=>{
                res.status(200).json({
                    meta : {
                        status : 200,
                        create : "success",
                    },
                    data : movie
                })
            })
            .catch(error =>{
                res.status(500).json({
                    meta : {
                        status : 500,
                        create : "failure",
                        message : "Error creating movie"
                    },
                    error
                })
            })
        } else {
            res.status(500).json({
                meta : {
                    status : 500,
                    create : "failure",
                    message : "Error creating movie"
                },
                errors : errors.mapped()
            })
        }
        
    },
    edit : (req, res)=>{
        let errors = validationResult(req)
        if (errors.isEmpty()) {
            db.Movie.update({...req.body},{ where : {id : req.params.id }})
            .then(()=>{
                res.status(200).json({
                    meta : {
                        status : 200,
                        update : "success",
                    }
                })
            })
            .catch(error =>{
                res.status(500).json({
                    meta : {
                        status : 500,
                        update : "failure",
                        message : "Error updating movie"
                    },
                    error
                })
            })
        } else {
            res.status(500).json({
                meta : {
                    status : 500,
                    create : "failure",
                    message : "Error creating movie"
                },
                errors : errors.mapped()
            })
        }
    },
    delete : (req, res)=>{
        let deleteCharMovie = db.Character_movie.destroy({ where : { id_movie : req.params.id }})
        let deleteMovie = db.Movie.destroy({ where : { id : req.params.id }})

        Promise.all([deleteCharMovie, deleteMovie])
        .then(([char_movie, movie ])=>{
            res.status(200).json({
                meta : {
                    status : 200,
                    delete : "success",
                }
            })
        })
        .catch(error =>{
            res.status(500).json({
                meta : {
                    status : 500,
                    delete : "failure",
                    message : "Error deleting movie"
                },
                error
            })
        })
    },

}

module.exports = controller