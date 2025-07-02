const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnalyticsSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    quizId: {
        type: Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    eventType: {
        type: String,
        enum: ['quiz_view', 'quiz_start', 'quiz_complete', 'quiz_share'],
        required: true
    },
    metadata: {
        type: Object,
        default: {}
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Analytics = mongoose.model('analytics', AnalyticsSchema);
