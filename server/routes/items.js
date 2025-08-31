const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Get all items
router.get('/', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// Add new item
router.post('/', async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const { text } = req.body;
    const item = new Item({ text });
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;