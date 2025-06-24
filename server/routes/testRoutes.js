import express from 'express';
import Quiz from '../models/quizModel.js';
import mongoose from 'mongoose';

const router = express.Router();

// Start a new test
router.post('/start', async (req, res) => {
  try {
    // Find a random active quiz
    const quiz = await Quiz.aggregate([
      { $match: { isActive: true } },
      { $sample: { size: 1 } }
    ]);

    if (!quiz || quiz.length === 0) {
      return res.status(404).json({ 
        message: 'No active quizzes available',
        showSampleData: true
      });
    }

    // Create a test session
    const test = {
      quizId: quiz[0]._id,
      userId: req.user?.id || 'anonymous',
      startTime: new Date(),
      status: 'in_progress',
      answers: []
    };

    // In a real app, you would save this to a Test collection
    // For now, we'll just return the test with the quiz data
    res.json({
      testId: new mongoose.Types.ObjectId(),
      ...test,
      quiz: quiz[0]
    });
  } catch (error) {
    console.error('Error starting test:', error);
    res.status(500).json({ 
      message: 'Error starting test',
      error: error.message 
    });
  }
});

// Submit test answers
router.post('/:testId/submit', async (req, res) => {
  try {
    const { answers } = req.body;
    const { testId } = req.params;

    // In a real app, you would:
    // 1. Find the test by ID
    // 2. Validate the answers
    // 3. Calculate the score
    // 4. Save the results

    // For now, just return a success response
    res.json({
      success: true,
      testId,
      message: 'Test submitted successfully',
      submittedAt: new Date(),
      answersReceived: answers
    });
  } catch (error) {
    console.error('Error submitting test:', error);
    res.status(500).json({ 
      message: 'Error submitting test',
      error: error.message 
    });
  }
});

// Get user's test history
router.get('/user', async (req, res) => {
  try {
    // In a real app, you would:
    // 1. Get the user ID from the auth token
    // 2. Query the Test collection for this user's tests
    // 3. Return the test history

    // For now, return an empty array
    res.json([]);
  } catch (error) {
    console.error('Error fetching user tests:', error);
    res.status(500).json({ 
      message: 'Error fetching test history',
      error: error.message 
    });
  }
});

export default router;
