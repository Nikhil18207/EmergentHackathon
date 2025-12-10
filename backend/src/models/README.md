# Models

This directory contains data models and database schemas.

## Structure

```
models/
├── User.model.js
├── Product.model.js
└── Order.model.js
```

## Example (with Mongoose)

```javascript
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: String,
  category: String,
  inStock: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Product', productSchema);
```

## Example (without ORM)

```javascript
export class Product {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.price = data.price;
    this.description = data.description;
  }
  
  static async findAll() {
    // Database query logic
  }
  
  static async findById(id) {
    // Database query logic
  }
}
```
