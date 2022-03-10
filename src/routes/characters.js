const express = require('express');
const router = express.Router();
const controller = require('../controllers/charactersController');
const characterValidator = require('../validations/create_edit_charact');


router.get('/', controller.index)
router.get('/characters', controller.allCharacters)
router.get('/characters/detail/:id', controller.oneCharacter)
router.post('/characters/create', characterValidator, controller.create)
router.put('/characters/edit/:id', characterValidator, controller.edit)
router.delete('/characters/delete/:id', controller.delete)


module.exports = router
