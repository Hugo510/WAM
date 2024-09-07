const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExamSchema = new mongoose.Schema({
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    questions: [{
        type: { type: String, enum: ['multiple_choice', 'true_false', 'open'], required: true },
        question: { type: String, required: true },
        options: [String],  // Opciones para selección múltiple (si aplica)
        correctAnswer: { type: String, required: true }  // Respuesta correcta
    }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Exam', ExamSchema);