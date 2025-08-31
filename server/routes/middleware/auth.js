const { verifyAccessToken } = require('../../utils/jwt');
const User = require('../../models/User');

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      console.log('Authentication failed: No token provided');
      return res.status(401).json({ 
        error: 'Access token required',
        message: 'Please provide a valid access token'
      });
    }

    const decoded = verifyAccessToken(token);
    console.log('Token verified for user:', decoded.userId);
    
    const user = await User.findById(decoded.userId);
    if (!user) {
      console.log('Authentication failed: User not found:', decoded.userId);
      return res.status(401).json({ 
        error: 'Invalid token',
        message: 'User associated with token not found'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: 'Token expired',
        message: 'Access token has expired, please login again'
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        error: 'Invalid token',
        message: 'Access token is malformed or invalid'
      });
    }
    
    return res.status(500).json({ 
      error: 'Authentication error',
      message: 'Failed to authenticate token'
    });
  }
};

module.exports = {
  authenticateToken
};