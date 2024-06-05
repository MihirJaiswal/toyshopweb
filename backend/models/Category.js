const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: String,
  image: String,
  products:[{type: Schema.Types.ObjectId , ref: 'Product' } ]// Corrected reference to 'Product'
});

module.exports = mongoose.model('Category', CategorySchema);
