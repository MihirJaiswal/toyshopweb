const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/product');
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false,
  saveUninitialized: true,
}));

let isAuthenticated = false;

const requireAuth = (req, res, next) => {
  if (req.session.isAuthenticated) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

app.post('/api/login', (req, res) => {
  console.log('Login request received:', req.body); 
  const { username, password } = req.body;
  if (username === process.env.USERNAME && password === process.env.PASSWORD) {
    isAuthenticated = true;
    console.log('Authentication successful');
    res.status(200).json({ message: 'Login successful' });
  } else {
    isAuthenticated = false;
    console.log('Authentication failed');
    res.status(401).json({ message: 'Unauthorized' });
  }
});

app.get('/api/check-auth', (req, res) => {
  res.json({ authenticated: isAuthenticated });
});

app.get('/admin', requireAuth, (req, res) => {
  res.send('Welcome to the admin page');
});

app.get('/signup', (req, res) => {
  res.send('Sign up page');
});

app.post('/api/logout', (req, res) => {
  console.log('Session expired, logging out...');
  req.session.isAuthenticated = false; 
  res.json({ message: 'Session expired' });
  isAuthenticated = false;
});

app.get('/', (req, res) => res.send('Toy Store API'));
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
