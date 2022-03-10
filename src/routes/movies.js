let express = require('express')
let router = express.Router()
let controller = require('../controllers/moviesController')


router.get('/movies', controller.allMovies)
router.get('/movies/detail/:id', controller.detail)
router.post('/movies/create', controller.create)
router.put('/movies/edit/:id', controller.edit)
router.delete('/movies/delete/:id', controller.delete)


module.exports = router
