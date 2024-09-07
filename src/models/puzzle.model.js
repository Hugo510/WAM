const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PuzzleSchema = new mongoose.Schema({
    type: { type: String, enum: ['multiple_choice', 'true_false', 'open'], required: true },  // Tipo de puzzle
    question: { type: String, required: true },
    options: [String],  // Opciones para selección múltiple o verdadero/falso
    correctAnswer: { type: String, required: true },  // Respuesta correcta
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Puzzle', PuzzleSchema);