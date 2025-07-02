const mongoose = require('mongoose');
const Score = require('./models/Score');
const User = require('./models/User');
const Quiz = require('./models/Quiz');
require('dotenv').config();

async function createDemoScores() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Check if demo scores already exist
        const existingScores = await Score.find();
        if (existingScores.length > 0) {
            console.log('Demo scores already exist!');
            console.log(`Found ${existingScores.length} scores in the database`);
            process.exit(0);
        }

        // Get demo user and create a demo quiz if needed
        const demoUser = await User.findOne({ email: 'demo@quizmaster.com' });
        if (!demoUser) {
            console.log('Demo user not found. Please run createDemoUser.js first.');
            process.exit(1);
        }

        // Create a demo quiz
        const demoQuiz = new Quiz({
            userId: demoUser._id,
            title: 'Sample Quiz',
            description: 'A sample quiz for testing',
            category: 'General Knowledge',
            questions: [{
                    text: 'What is 2 + 2?',
                    options: ['3', '4', '5', '6'],
                    correctAnswer: 1
                },
                {
                    text: 'What is the capital of France?',
                    options: ['London', 'Berlin', 'Paris', 'Madrid'],
                    correctAnswer: 2
                }
            ],
            isPublic: true
        });

        await demoQuiz.save();
        console.log('Demo quiz created');

        // Create demo scores
        const demoScores = [
            { userId: demoUser._id, quizId: demoQuiz._id, score: 95, total: 100 },
            { userId: demoUser._id, quizId: demoQuiz._id, score: 87, total: 100 },
            { userId: demoUser._id, quizId: demoQuiz._id, score: 92, total: 100 },
            { userId: demoUser._id, quizId: demoQuiz._id, score: 78, total: 100 },
            { userId: demoUser._id, quizId: demoQuiz._id, score: 89, total: 100 }
        ];

        await Score.insertMany(demoScores);
        console.log('Demo scores created successfully!');
        console.log(`Created ${demoScores.length} demo scores`);

    } catch (error) {
        console.error('Error creating demo scores:', error);
    } finally {
        mongoose.connection.close();
    }
}

createDemoScores();