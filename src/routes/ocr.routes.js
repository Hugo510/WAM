const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');  // Middleware de multer
const ocrController = require('../controllers/ocr.controller');

// Ruta para subir la imagen y realizar OCR
router.post('/upload-credential', upload.single('credential'), ocrController.uploadCredentialAndDetectText);

module.exports = router;
