const express = require('express');
const router = express.Router();

const Fruit = require('../models/Fruit');

// GET all fruits
router.get('/', async (req, res) => {
  try {
    const fruits = await Fruit.find();
    res.json(fruits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new fruit
router.post('/', async (req, res) => {
  try {
    const fruit = new Fruit(req.body);
    await fruit.save();
    res.status(201).json(fruit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;