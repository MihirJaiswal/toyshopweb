const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category'); 

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

router.post('/', async (req, res) => {
  const { categoryName, ...productData } = req.body;

  try {
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return res.status(400).json({ message: 'Category not found' });
    }

    const newProduct = new Product({ ...productData, categoryName });
    await newProduct.save();
    category.products.push(newProduct._id);
    await category.save();
    res.status(201).json(newProduct);
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ message: 'Product name must be unique' });
    } else {
      res.status(400).json({ message: err.message });
    }
  }
});

router.delete('/:productName', async (req, res) => {
  const productName = req.params.productName;

  try {
    const product = await Product.findOneAndDelete({ name: productName });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await Category.updateOne(
      { name: product.categoryName },
      { $pull: { products: product._id } }
    );

    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:productName', async (req, res) => {
  const productName = req.params.productName;
  const { categoryName, ...updateData } = req.body;

  try {
    const product = await Product.findOne({ name: productName });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (categoryName) {
      const category = await Category.findOne({ name: categoryName });
      if (!category) {
        return res.status(400).json({ message: 'Category not found' });
      }
      product.categoryName = categoryName;
    }

    Object.assign(product, updateData);
    await product.save();

    res.json(product);
  } catch (err) {
    if (err.code === 11000) {
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
