const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category'); // Import Category model

// Get all products
router.get('/:productName', async (req, res) => {
  const productName = req.params.productName;

  try {
    const product = await Product.findOne({ name: productName });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Create a new product
router.post('/', async (req, res) => {
    const { categoryName, ...productData } = req.body;
  
    try {
      // Find the category by name to retrieve its ObjectId
      const category = await Category.findOne({ name: categoryName });
      if (!category) {
        return res.status(400).json({ message: 'Category not found' });
      }
  
      // Create the product with the category ObjectId
      const newProduct = new Product({ ...productData, categoryName });
      await newProduct.save();
      category.products.push(newProduct);
      await category.save()
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

module.exports = router;
