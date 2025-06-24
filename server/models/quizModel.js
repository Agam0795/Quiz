import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true }
});

const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  duration: { type: Number, required: true }, // in minutes
  isActive: { type: Boolean, default: true },
  questions: [QuestionSchema]
}, { timestamps: true });

const Quiz = mongoose.model('Quiz', QuizSchema);
export default Quiz;
