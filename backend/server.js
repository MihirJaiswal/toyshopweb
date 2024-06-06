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


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(session({
  secret: 'secret', // Change this to a secure secret for production
  resave: false,
  saveUninitialized: true,
}));

// Authentication middleware
const requireAuth = (req, res, next) => {
  if (req.session.isAuthenticated) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

app.post('/api/login', (req, res) => {
    console.log('Login request received:', req.body); // Log request body
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password123') {
      isAuthenticated = true;
      console.log('Authentication successful');
      res.status(200).json({ message: 'Login successful' });
    } else {
      isAuthenticated = false;
      console.log('Authentication failed');
      res.status(401).json({ message: 'Unauthorized' });
    }
  });


// Check Auth Endpoint
app.get('/api/check-auth', (req, res) => {
    // or false based on your logi  
    // Respond with authentication status
    res.json({ authenticated: isAuthenticated });
});

// Redirect Unauthorized Access to Signup
app.get('/admin', requireAuth, (req, res) => {
  res.send('Welcome to the admin page');
});

// Render the Signup Page
app.get('/signup', (req, res) => {
  res.send('Sign up page');
});

app.post('/api/logout', (req, res) => {
    // Logic to clear the session or revoke the token
    console.log('Session expired, logging out...');
    res.json({ message: 'Session expired' });
    isAuthenticated = false;
  });
  

// Routes
app.get('/', (req, res) => res.send('Toy Store API'));
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);


// Routes
app.get('/', (req, res) => res.send('Toy Store API'));

app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI)
.then(() => console.log('MongoDB connected')) // Success message
.catch(err => console.error('MongoDB connection error:', err)); // Error message

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
