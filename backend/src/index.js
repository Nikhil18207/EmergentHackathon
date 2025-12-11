import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import garmentsRoutes from './routes/garments.routes.js';
import materialsRoutes from './routes/materials.routes.js';
import featuresRoutes from './routes/features.routes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'Fashion API Server',
        version: '1.0.0',
        status: 'running'
    });
});

app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

// API Routes
app.use('/api/garments', garmentsRoutes);
app.use('/api/materials', materialsRoutes);
app.use('/api/features', featuresRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: err.message
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 TrendPilot API Server running on port ${PORT}`);
    console.log(`📍 API endpoint: http://localhost:${PORT}`);
    console.log(`📊 Available routes:`);
    console.log(`   - GET  /api/garments`);
    console.log(`   - GET  /api/materials`);
    console.log(`   - GET  /api/features`);
});
