# Routes

This directory contains all API route definitions.

## Structure

Each route file should handle a specific resource or feature:

```
routes/
├── auth.routes.js       # Authentication routes
├── user.routes.js       # User management routes
├── product.routes.js    # Product routes
└── order.routes.js      # Order routes
```

## Example

```javascript
import express from 'express';
const router = express.Router();

// GET /api/products
router.get('/', (req, res) => {
  // Handle get all products
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
  // Handle get product by id
});

export default router;
```
