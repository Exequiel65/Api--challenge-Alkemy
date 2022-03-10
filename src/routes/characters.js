const express = require('express');
const router = express.Router();
const controller = require('../controllers/charactersController')

router.get('/', controller.index)
router.get('/characters', controller.allCharacters)
router.get('/characters/detail/:id', controller.oneCharacter)
router.post('/characters/create', controller.create)
router.put('/characters/edit/:id', controller.edit)
router.delete('/characters/delete/:id', controller.delete)


module.exports = router
