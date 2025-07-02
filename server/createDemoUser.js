const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

// Demo account credentials
const DEMO_EMAIL = 'demo@quizmaster.com';
const DEMO_PASSWORD = 'demo123';
const DEMO_NAME = 'Demo User';

async function createDemoUser() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Check if demo user already exists
        const existingUser = await User.findOne({ email: DEMO_EMAIL });
        if (existingUser) {
            console.log('Demo user already exists! Deleting and recreating...');
            await User.deleteOne({ email: DEMO_EMAIL });
            console.log('Existing demo user deleted.');
        }

        // Create salt & hash for password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(DEMO_PASSWORD, salt);

        // Create new demo user
        const demoUser = new User({
            name: DEMO_NAME,
            email: DEMO_EMAIL,
            password: hashedPassword
        });

        await demoUser.save();
        console.log('Demo user created successfully!');
        console.log(`Email: ${DEMO_EMAIL}`);
        console.log(`Password: ${DEMO_PASSWORD}`);
        console.log('You can now use these credentials to login.');

    } catch (error) {
        console.error('Error creating demo user:', error);
    } finally {
        mongoose.connection.close();
    }
}

createDemoUser();