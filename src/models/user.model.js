const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },  // Referencia al esquema de roles
    achievements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Achievement' }],  // Logros
    score: { type: Number, default: 0 },  // Puntaje acumulado por módulos
    streak: { type: Number, default: 0 },  // Racha diaria
    lastLogin: { type: Date },  // Control de la última fecha de acceso
    profilePicture: { type: String },  // Referencia a la imagen de perfil
    credential: { type: String },  // Campo donde se almacenará la imagen enviada
    image: { type: Buffer },  // Almacenar la imagen en formato binario
    detectedText: { type: String },  // Texto extraído de la imagen de la credencial
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isFirstTimeUser: { type: Boolean, default: true }  // Campo binario de verdadero/falso
});
    


module.exports = mongoose.model('User', UserSchema);