const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category'); // Import Category model

// Get a product by name
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
    // Find the category by name to validate it exists
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return res.status(400).json({ message: 'Category not found' });
    }

    // Create the product
    const newProduct = new Product({ ...productData, categoryName });
    await newProduct.save();
    category.products.push(newProduct._id);
    await category.save();
    res.status(201).json(newProduct);
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate key error
      res.status(400).json({ message: 'Product name must be unique' });
    } else {
      res.status(400).json({ message: err.message });
    }
  }
});

// Delete a product by name
router.delete('/:productName', async (req, res) => {
  const productName = req.params.productName;

  try {
    const product = await Product.findOneAndDelete({ name: productName });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Remove product from category's products array
    await Category.updateOne(
      { name: product.categoryName },
      { $pull: { products: product._id } }
    );

    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a product by name
router.put('/:productName', async (req, res) => {
  const productName = req.params.productName;
  const { categoryName, ...updateData } = req.body;

  try {
    const product = await Product.findOne({ name: productName });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // If a new category is provided, update the product's category
    if (categoryName) {
      const category = await Category.findOne({ name: categoryName });
      if (!category) {
        return res.status(400).json({ message: 'Category not found' });
      }
      product.categoryName = categoryName;
    }

    // Update product details
    Object.assign(product, updateData);
    await product.save();

    res.json(product);
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate key error
      res.status(400).json({ message: 'Product name must be unique' });
    } else {
      res.status(400).json({ message: err.message });
    }
  }
});

router.put('/:productName', async (req, res) => {
  const productName = req.params.productName;
  const updates = req.body;

  try {
    // Find product by name and update
    const product = await Product.findOneAndUpdate({ name: productName }, updates, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;
