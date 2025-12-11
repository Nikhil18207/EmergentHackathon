import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all garments
router.get('/', async (req, res) => {
  try {
    const dataPath = path.join(__dirname, '../../data/garments.json');
    const data = await fs.readFile(dataPath, 'utf-8');
    const garments = JSON.parse(data);
    
    res.json({ 
      success: true, 
      data: garments,
      count: garments.length 
    });
  } catch (error) {
    console.error('Error fetching garments:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get garment by ID
router.get('/:id', async (req, res) => {
  try {
    const dataPath = path.join(__dirname, '../../data/garments.json');
    const data = await fs.readFile(dataPath, 'utf-8');
    const garments = JSON.parse(data);
    const garment = garments.find(g => g.id === req.params.id);
    
    if (!garment) {
      return res.status(404).json({ 
        success: false, 
        error: 'Garment not found' 
      });
    }
    
    res.json({ 
      success: true, 
      data: garment 
    });
  } catch (error) {
    console.error('Error fetching garment:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get garments by category
router.get('/category/:category', async (req, res) => {
  try {
    const dataPath = path.join(__dirname, '../../data/garments.json');
    const data = await fs.readFile(dataPath, 'utf-8');
    const garments = JSON.parse(data);
    const filtered = garments.filter(g => g.category === req.params.category);
    
    res.json({ 
      success: true, 
      data: filtered,
      count: filtered.length 
    });
  } catch (error) {
    console.error('Error fetching garments by category:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get garments by subcategory
router.get('/subcategory/:subcategory', async (req, res) => {
  try {
    const dataPath = path.join(__dirname, '../../data/garments.json');
    const data = await fs.readFile(dataPath, 'utf-8');
    const garments = JSON.parse(data);
    const filtered = garments.filter(g => g.subcategory === req.params.subcategory);
    
    res.json({ 
      success: true, 
      data: filtered,
      count: filtered.length 
    });
  } catch (error) {
    console.error('Error fetching garments by subcategory:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

export default router;
