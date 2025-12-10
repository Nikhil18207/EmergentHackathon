# Middleware

This directory contains custom middleware functions.

## Structure

```
middleware/
├── auth.middleware.js       # Authentication middleware
├── validation.middleware.js # Request validation
├── error.middleware.js      # Error handling
└── logger.middleware.js     # Request logging
```

## Example

```javascript
// auth.middleware.js
export const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    // Verify token logic here
    req.user = decodedUser;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// validation.middleware.js
export const validateProduct = (req, res, next) => {
  const { name, price } = req.body;
  
  if (!name || !price) {
    return res.status(400).json({ 
      error: 'Name and price are required' 
    });
  }
  
  next();
};
```
