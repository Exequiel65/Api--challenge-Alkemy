const db = require('../database/models')


let controller = {
    index : (req, res)=>{
        res.status(200).json({
            conected : true,
            session : req.session
        })
    },
    allCharacters : (req, res)=>{
        let query = req.query
        let param = {}
        if (query.name) param['name'] = query.name;
        if (query.age) param['age'] = query.age;
        if (query.weigth) param['weigth'] = query.weigth;
        
        db.Character.findAll({
            attributes: ['image', 'name'],
            where : param
        })
        .then(characters =>{
            res.status(200).json({
                meta : {
                    status : 200,
                    search : "success",
                },
                data : characters
            })
        })
        .catch(error => res.status(500).json({
            meta : {
                status : 500,
                search : "failure",
                message : "Error finding information"
            },
            error
        }))

    },

    oneCharacter : (req, res) =>{
        db.Character.findByPk(req.params.id,{
            include : [{association : "movies"}]
        })
        .then(character =>{
            res.send(character)
        })
    },

    create : (req, res)=>{

        let  {image, name, age, weigth, history, movie_char} = req.body

        

        db.Movie.findOne({ where : { title : movie_char }})
        .then(movie =>{

            if (!movie) {
                return Promise.reject()
            } else{
                db.Character.create({ image, name, age, weigth, history })
                .then(result =>{
                    db.Character_movie.create({ id_movie : movie.id, id_character : result.id })
                    .then(chmovie =>{
                        res.json({
                            meta : {
                                status : 200,
                                search : true,
                                create : true
                            },
                            movie,
                            Character : result
                            
                        })
                    })
                    .catch(error => res.status(500).json({
                        meta : {
                            status : 500,
                            search : true,
                            create : false,
                            message : "Error create character_movie"
                        },
                        error
                    }))
                })
                .catch(error => res.status(500).json({
                    meta : {
                        status : 500,
                        search : true,
                        create : false,
                        message : "Error creating character"
                    },
                    error
                }))
                
            }
        })
        .catch(error => res.status(500).json({
            meta : {
                status : 500,
                search : "failure",
                create : false,
                message : " Error finding movie, please enter an existing movie",
                rederict : "/api/movies/create"
            },
            error
        }))
        
    },
    edit: (req, res) =>{
        let  {image, name, age, weigth, history, movie_char} = req.body

        db.Movie.findOne({ where : { title : movie_char }})
        .then(movie =>{
            if (!movie) {
                return Promise.reject()
            } else{

                let updateChar = db.Character.update({ image, name, age, weigth, history }, { where : { id : req.params.id }})
                let updateCharMovie = db.Character_movie.update({ id_movie : movie.id }, { where : { id_character : req.params.id }})

                Promise.all([updateChar, updateCharMovie])
                .then(([character, char_movie])=>{
                    res.json({
                        meta : {
                            status : 200,
                            update : true
                        }
                        
                    })
                })
                .catch(error => res.status(500).json({
                    meta : {
                        status : 500,
                        update : false,
                        message : "Error updating character"
                    },
                    error
                }))
            }
        })

        .catch(error => res.status(500).json({
            meta : {
                status : 500,
                search : "failure",
                message : " Error finding movie, please enter an existing movie",
                rederict : ""
            },
            error
            }))
        

    },

    delete : (req, res) =>{
        let idParams = req.params.id
        
        let deleteCharMovie = db.Character_movie.destroy({ where : { id_character : idParams }})
        let deleteCharacter = db.Character.destroy({ where : { id : idParams }})

        Promise.all([deleteCharMovie, deleteCharacter])
        .then(([result, result2])=>{
            res.json({
                meta : {
                    status : 200,
                    delete : true
                },
                result,
                result2
                
            })
        })
    }
}
module.exports = controller