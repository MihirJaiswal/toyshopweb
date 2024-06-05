const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/product');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI)
.then(() => console.log('MongoDB connected')) // Success message
.catch(err => console.error('MongoDB connection error:', err)); // Error message

// Routes
app.get('/', (req, res) => res.send('Toy Store API'));

app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
