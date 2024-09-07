const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AchievementSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },  // Logro por completar curso
    description: { type: String, required: true },
    dateEarned: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Achievement', AchievementSchema);