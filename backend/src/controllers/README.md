# Controllers

This directory contains controller functions that handle the business logic for routes.

## Structure

Controllers should be organized by resource:

```
controllers/
├── auth.controller.js
├── user.controller.js
├── product.controller.js
└── order.controller.js
```

## Example

```javascript
// product.controller.js
export const getAllProducts = async (req, res) => {
  try {
    // Business logic here
    res.json({ products: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    // Business logic here
    res.json({ product: {} });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```
