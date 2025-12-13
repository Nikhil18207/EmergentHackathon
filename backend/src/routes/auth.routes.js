import express from 'express';
// Using mock controller for hackathon demo (no MongoDB required)
import { register, login, getProfile, logout, getAllUsers } from '../controllers/auth.mock.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Protected routes
router.get('/profile', authenticateToken, getProfile);

// Debug route (for hackathon demo only - remove in production)
router.get('/users', getAllUsers);

export default router;
