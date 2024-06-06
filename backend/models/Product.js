const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { type: String, unique: true, required: true },
    image: String,
    description: String,
    price: Number,
    isPopular: Boolean,
    isShown: Boolean,
    categoryName: { type: String, required: true }
  });  

module.exports = mongoose.model('Product', ProductSchema);
