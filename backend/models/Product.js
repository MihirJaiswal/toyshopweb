const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    image: String,
    description: String,
    price: Number,
    isPopular: Boolean,
    isShown: Boolean,
    categoryName: { type: String, required: true } // Store category name directly
  });  

module.exports = mongoose.model('Product', ProductSchema);
