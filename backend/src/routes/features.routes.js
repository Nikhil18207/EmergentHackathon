import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all features
router.get('/', async (req, res) => {
    try {
        const dataPath = path.join(__dirname, '../../data/features.json');
        const data = await fs.readFile(dataPath, 'utf-8');
        const features = JSON.parse(data);

        res.json({
            success: true,
            data: features,
            count: features.length
        });
    } catch (error) {
        console.error('Error fetching features:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get feature by ID
router.get('/:id', async (req, res) => {
    try {
        const dataPath = path.join(__dirname, '../../data/features.json');
        const data = await fs.readFile(dataPath, 'utf-8');
        const features = JSON.parse(data);
        const feature = features.find(f => f.id === req.params.id);

        if (!feature) {
            return res.status(404).json({
                success: false,
                error: 'Feature not found'
            });
        }

        res.json({
            success: true,
            data: feature
        });
    } catch (error) {
        console.error('Error fetching feature:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get features supported by garment
router.get('/garment/:garmentId', async (req, res) => {
    try {
        const dataPath = path.join(__dirname, '../../data/features.json');
        const data = await fs.readFile(dataPath, 'utf-8');
        const features = JSON.parse(data);
        const supported = features.filter(f =>
            f.supportedGarments.includes(req.params.garmentId)
        );

        res.json({
            success: true,
            data: supported,
            count: supported.length
        });
    } catch (error) {
        console.error('Error fetching features for garment:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get features by category
router.get('/category/:category', async (req, res) => {
    try {
        const dataPath = path.join(__dirname, '../../data/features.json');
        const data = await fs.readFile(dataPath, 'utf-8');
        const features = JSON.parse(data);
        const filtered = features.filter(f => f.category === req.params.category);

        res.json({
            success: true,
            data: filtered,
            count: filtered.length
        });
    } catch (error) {
        console.error('Error fetching features by category:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

export default router;
