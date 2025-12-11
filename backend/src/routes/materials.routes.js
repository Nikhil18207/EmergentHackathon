import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all materials
router.get('/', async (req, res) => {
    try {
        const dataPath = path.join(__dirname, '../../data/materials.json');
        const data = await fs.readFile(dataPath, 'utf-8');
        const materials = JSON.parse(data);

        res.json({
            success: true,
            data: materials,
            count: materials.length
        });
    } catch (error) {
        console.error('Error fetching materials:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get material by ID
router.get('/:id', async (req, res) => {
    try {
        const dataPath = path.join(__dirname, '../../data/materials.json');
        const data = await fs.readFile(dataPath, 'utf-8');
        const materials = JSON.parse(data);
        const material = materials.find(m => m.id === req.params.id);

        if (!material) {
            return res.status(404).json({
                success: false,
                error: 'Material not found'
            });
        }

        res.json({
            success: true,
            data: material
        });
    } catch (error) {
        console.error('Error fetching material:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get materials suitable for garment type
router.get('/suitable/:garmentType', async (req, res) => {
    try {
        const dataPath = path.join(__dirname, '../../data/materials.json');
        const data = await fs.readFile(dataPath, 'utf-8');
        const materials = JSON.parse(data);
        const suitable = materials.filter(m =>
            m.suitableFor.includes(req.params.garmentType)
        );

        res.json({
            success: true,
            data: suitable,
            count: suitable.length
        });
    } catch (error) {
        console.error('Error fetching suitable materials:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get materials by type
router.get('/type/:type', async (req, res) => {
    try {
        const dataPath = path.join(__dirname, '../../data/materials.json');
        const data = await fs.readFile(dataPath, 'utf-8');
        const materials = JSON.parse(data);
        const filtered = materials.filter(m => m.type === req.params.type);

        res.json({
            success: true,
            data: filtered,
            count: filtered.length
        });
    } catch (error) {
        console.error('Error fetching materials by type:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

export default router;
