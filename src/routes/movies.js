let express = require('express')
let router = express.Router()
let controller = require('../controllers/moviesController')
let movieValidator = require('../validations/create_edit_movies')


router.get('/movies', controller.allMovies)
router.get('/movies/detail/:id', controller.detail)
router.post('/movies/create', movieValidator,controller.create)
router.put('/movies/edit/:id', movieValidator, controller.edit)
router.delete('/movies/delete/:id', controller.delete)


module.exports = router
