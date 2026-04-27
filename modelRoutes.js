const express = require('express');
const router = express.Router();
const fruitController = require('../controllers/fruitController');

router.post('/create', fruitController.createFruit);
router.get('/all', fruitController.getFruits);
router.put('/update/:id', fruitController.updateFruit);
router.delete('/delete/:id', fruitController.deleteFruit);

module.exports = router;