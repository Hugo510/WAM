const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },  // Relación con la categoría
    contentAndPuzzles: [{  // Secuencia de contenidos y puzzles
        type: { type: String, enum: ['text', 'image', 'video', 'puzzle'], required: true },
        data: { type: String },  // Puede ser texto o referencia a URL si es multimedia
        puzzleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Puzzle' }  // Solo si es un puzzle
    }],
    finalExam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },  // Examen final
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', CourseSchema);