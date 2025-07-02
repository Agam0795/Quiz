const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    options: [{
        type: String,
        required: true
    }],
    correctAnswer: {
        type: Number,
        required: true
    },
    image: {
        type: String, // URL to uploaded image
        default: ''
    },
    video: {
        type: String, // URL to uploaded video
        default: ''
    },
    timeLimit: {
        type: Number, // Time limit in seconds for this question
        default: 0 // 0 means no time limit
    }
});

const QuizSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    category: {
        type: String,
        default: 'General'
    },
    tags: [{
        type: String
    }],
    questions: [QuestionSchema],
    isPublic: {
        type: Boolean,
        default: false
    },
    shareId: {
        type: String,
        unique: true,
        sparse: true // For shareable quiz links
    },
    timeLimit: {
        type: Number, // Overall quiz time limit in minutes
        default: 0 // 0 means no time limit
    },
    attempts: {
        type: Number,
        default: 0
    },
    totalScore: {
        type: Number,
        default: 0
    },
    averageScore: {
        type: Number,
        default: 0
    },
    collaborators: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        role: {
            type: String,
            enum: ['editor', 'viewer'],
            default: 'viewer'
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = Quiz = mongoose.model('Quiz', QuizSchema);