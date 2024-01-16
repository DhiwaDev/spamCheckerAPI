// Import necessary modules
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Initialize an Express router
const router = express.Router();

//User Registration endpoint
router.post("/register", async (req, res) => {
    try {
      // Extract user details from request body
      const { name, phone, email, password } = req.body;

      // Check if a user with the same phone number already exists
      const existingUser = await User.findOne({ where: { phone } });
        if (existingUser) {
          // If user exists, return an error
          return res
            .status(400)
            .json({ error: "User with this phone number already exists" });
        }

      // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create a new user
        const newUser = await User.create({
            name,
            phone,
            email,
            password: hashedPassword,
        });

      // Return a success response
      res
        .status(201)
        .json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      // Log any errors and return a failure response
      console.log(error);
      res.status(500).json({
        error: "Registration failed. Please check your input and try again.",
      });
    }
});

//User Login endpoint
router.post('/login', async (req, res) => {
    try {
        // Extract phone and password from request body
        const { phone, password } = req.body;

        // Find the user by phone number
        const user = await User.findOne({ where: { phone } });
        if (!user) {
            // If user is not found, return a 404 error
            return res.status(404).json({ error: 'User not found' });
        }

        // Check the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            // If password is invalid, return an error
            return res.status(401).json({ error: 'Invalid password' });
        }

        console.log(`User ${user.name} logged in with correct password`);

        //  Generate a JWT token for the user
        const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });
        
        // Return the token in the response
        res.json({ token });
    } catch (error) {
        // Log any errors and return a failure response
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// JWT authentication middleware
function authenticateToken(req, res, next) {
    // Extract the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    // Verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // If token is invalid, return a 403 error
        req.userId = user.id; // Set the user ID in the request object
        next(); // Pass the execution to the next middleware
    });
}

// Profile (requires authentication)
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        // Extract the user ID from the request object
        const userId = req.userId;
        
        // Retrieve the user's profile, excluding the password
        const user = await User.findByPk(userId, { attributes: { exclude: ['password'] } });
        
        if (!user) {
            // If user is not found, return an error
            return res.status(404).json({ error: 'User not found' });
        }
        
        // Return the user profile
        res.json(user);
    } catch (error) {
        // Log any errors and return a failure response
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Export the router
module.exports = router;