const express = require('express');
const router = express.Router();
const peopleController = require('../controllers/peopleController');

router.post('/', peopleController.createPeople);
router.get('/', peopleController.getPeople);
router.get('/:id', peopleController.getPeopleById);
router.put('/:id', peopleController.updatePeople);
router.delete('/:id', peopleController.deletePeople);

module.exports = router;
