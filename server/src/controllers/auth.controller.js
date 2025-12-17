const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ================= REGISTER =================

exports.register = async (req,res) => {
    try {
        const { name, email, password, cfHandle } = req.body;

        // Basic validation
        if (!name || !email || !password || !cfHandle) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Hash password, we wont store plain text password in DB,instead we will store hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            cfHandle
        });


        // respond with success message
        res.status(201).json(
            { message: 'User registered successfully' }
        );

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration' });  
    }
};


// ================= LOGIN =================

exports.login = async (req,res) => {
    try {
        const {email, password} = req.body;

        // Basic validation

        if(!email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { UserId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Respond with token and user data
        res.status(200).json({
            token,
            user: {
                name: user.name,
                email: user.email,
                cfHandle: user.cfHandle
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json(
            { message: 'Server error during login' }
        );
    }
};