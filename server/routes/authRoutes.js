const express = require('express');
const User = require('../models/User');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');
const { validatePassword } = require('../utils/password');
const { authenticateToken } = require('./middleware/auth');

const router = express.Router();

// Register new user
router.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    
    console.log('Registration attempt for email:', email);

    // Validate required fields
    if (!email || !password) {
      console.log('Registration failed: Missing required fields');
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Email and password are required'
      });
    }

    // Validate email format
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      console.log('Registration failed: Invalid email format');
      return res.status(400).json({
        error: 'Invalid email format',
        message: 'Please enter a valid email address'
      });
    }

    // Validate password strength
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      console.log('Registration failed: Password validation errors:', passwordErrors);
      return res.status(400).json({
        error: 'Password validation failed',
        message: passwordErrors.join('. ')
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      console.log('Registration failed: User already exists');
      return res.status(409).json({
        error: 'User already exists',
        message: 'An account with this email already exists'
      });
    }

    // Create new user
    const user = new User({
      email: email.toLowerCase(),
      password,
      firstName: firstName?.trim(),
      lastName: lastName?.trim()
    });

    await user.save();
    console.log('User registered successfully:', user._id);

    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.status(201).json({
      message: 'User registered successfully',
      user: user.toJSON(),
      accessToken,
      refreshToken
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        error: 'Validation error',
        message: messages.join('. ')
      });
    }
    
    res.status(500).json({
      error: 'Registration failed',
      message: 'An error occurred during registration'
    });
  }
});

// Login user
router.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('Login attempt for email:', email);

    // Validate required fields
    if (!email || !password) {
      console.log('Login failed: Missing credentials');
      return res.status(400).json({
        error: 'Missing credentials',
        message: 'Email and password are required'
      });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.log('Login failed: User not found');
      return res.status(401).json({
        error: 'Invalid credentials',
        message: 'Email or password is incorrect'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      console.log('Login failed: Invalid password');
      return res.status(401).json({
        error: 'Invalid credentials',
        message: 'Email or password is incorrect'
      });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    console.log('User logged in successfully:', user._id);

    res.json({
      message: 'Login successful',
      user: user.toJSON(),
      accessToken,
      refreshToken
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'Login failed',
      message: 'An error occurred during login'
    });
  }
});

// Get current user profile
router.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    console.log('Profile request for user:', req.user._id);
    
    res.json({
      user: req.user.toJSON()
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({
      error: 'Profile fetch failed',
      message: 'An error occurred while fetching profile'
    });
  }
});

// Logout user (client-side token removal, but we can track it server-side if needed)
router.post('/api/auth/logout', authenticateToken, async (req, res) => {
  try {
    console.log('Logout request for user:', req.user._id);
    
    // In a more complex implementation, you might want to blacklist the token
    // or store logout events in the database
    
    res.json({
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      error: 'Logout failed',
      message: 'An error occurred during logout'
    });
  }
});

module.exports = router;