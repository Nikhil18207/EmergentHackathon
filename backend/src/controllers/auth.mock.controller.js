import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// In-memory user storage (for hackathon demo - no MongoDB needed)
const users = new Map();

// Generate JWT token
const generateToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
};

// Hash password
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

// Compare password
const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
    try {
        const { email, password, displayName, role } = req.body;

        // Validate input
        if (!email || !password || !displayName || !role) {
            return res.status(400).json({
                success: false,
                error: 'Please provide all required fields: email, password, displayName, role'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                error: 'Please provide a valid email address'
            });
        }

        // Validate password strength
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                error: 'Password must be at least 8 characters long'
            });
        }

        const emailLower = email.toLowerCase();

        // Check if user already exists
        if (users.has(emailLower)) {
            return res.status(409).json({
                success: false,
                error: 'User with this email already exists'
            });
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create user object
        const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const user = {
            id: userId,
            email: emailLower,
            password: hashedPassword,
            displayName,
            role,
            createdAt: new Date().toISOString()
        };

        // Store user
        users.set(emailLower, user);

        // Generate token
        const token = generateToken(userId);

        // Return user without password
        const { password: _, ...userWithoutPassword } = user;

        console.log(`✅ User registered: ${email}`);
        console.log(`📊 Total users: ${users.size}`);

        res.status(201).json({
            success: true,
            data: {
                user: userWithoutPassword,
                token
            },
            message: 'User registered successfully'
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            success: false,
            error: `Error registering user: ${error.message}`
        });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Please provide email and password'
            });
        }

        const emailLower = email.toLowerCase();

        // Find user by email
        const user = users.get(emailLower);
        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'User not found. Please create an account first.'
            });
        }

        // Validate password
        const isValidPassword = await comparePassword(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                error: 'Invalid password. Please try again.'
            });
        }

        // Generate token
        const token = generateToken(user.id);

        // Return user without password
        const { password: _, ...userWithoutPassword } = user;

        console.log(`✅ User logged in: ${email}`);

        res.status(200).json({
            success: true,
            data: {
                user: userWithoutPassword,
                token
            },
            message: 'Login successful'
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            error: 'Error logging in'
        });
    }
};

// @desc    Get current user profile
// @route   GET /api/auth/profile
// @access  Private
export const getProfile = async (req, res) => {
    try {
        // User ID is attached to req by auth middleware
        const userId = req.user.id;

        // Find user by ID
        let user = null;
        for (const [_, userData] of users.entries()) {
            if (userData.id === userId) {
                user = userData;
                break;
            }
        }

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        // Return user without password
        const { password: _, ...userWithoutPassword } = user;

        res.status(200).json({
            success: true,
            data: userWithoutPassword
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            error: 'Error fetching profile'
        });
    }
};

// @desc    Logout user (client-side token removal)
// @route   POST /api/auth/logout
// @access  Public
export const logout = async (req, res) => {
    // With JWT, logout is handled client-side by removing the token
    res.status(200).json({
        success: true,
        message: 'Logout successful'
    });
};

// @desc    Get all users (for debugging - remove in production)
// @route   GET /api/auth/users
// @access  Public (for hackathon demo only)
export const getAllUsers = async (req, res) => {
    const userList = Array.from(users.values()).map(({ password, ...user }) => user);
    res.status(200).json({
        success: true,
        data: {
            users: userList,
            count: users.size
        }
    });
};
