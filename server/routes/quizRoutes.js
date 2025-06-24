import express from 'express';
import Quiz from '../models/quizModel.js';

const router = express.Router();

// GET all active quizzes (or all quizzes if showAll=true)
router.get('/', async (req, res) => {
  try {
    const { showAll } = req.query;
    const query = showAll === 'true' ? {} : { isActive: true };
    
    const quizzes = await Quiz.find(query);
    if (quizzes.length === 0) {
      return res.status(200).json({ 
        message: 'No quizzes found',
        showSampleData: true
      });
    }
    res.json(quizzes);
  } catch (err) {
    console.error('Error fetching quizzes:', err);
    res.status(500).json({ 
      message: 'Error fetching quizzes',
      error: err.message 
    });
  }
});

// GET a single quiz by ID
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE a new quiz
router.post('/', async (req, res) => {
  const { title, description, duration, questions } = req.body;
  const quiz = new Quiz({ title, description, duration, questions });
  try {
    const newQuiz = await quiz.save();
    res.status(201).json(newQuiz);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE an existing quiz
router.put('/:id', async (req, res) => {
  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedQuiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(updatedQuiz);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a quiz
router.delete('/:id', async (req, res) => {
  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!deletedQuiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json({ message: 'Quiz deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
