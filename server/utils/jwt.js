const jwt = require('jsonwebtoken');

const generateAccessToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

const generateRefreshToken = (userId) => {
  if (!process.env.REFRESH_TOKEN_SECRET) {
    throw new Error('REFRESH_TOKEN_SECRET is not defined in environment variables');
  }
  
  return jwt.sign(
    { userId },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );
};

const verifyAccessToken = (token) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  
  return jwt.verify(token, process.env.JWT_SECRET);
};

const verifyRefreshToken = (token) => {
  if (!process.env.REFRESH_TOKEN_SECRET) {
    throw new Error('REFRESH_TOKEN_SECRET is not defined in environment variables');
  }
  
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken
};