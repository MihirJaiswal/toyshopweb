// routes/categories.js
const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Product = require('../models/Product');

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().populate('products');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new category
router.post('/', async (req, res) => {
  const { name, image } = req.body;

  try {
    // Check if category name already exists
    const existingCategory = await Category.findOne({ name: name });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category name already exists' });
    }

    const category = new Category({ name, image });
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

  router.delete('/:name', async (req, res) => {
    try {
      const category = await Category.findOne({ name: req.params.name });
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      await category.deleteOne();
      res.json({ message: 'Category deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;
