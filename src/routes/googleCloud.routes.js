const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Carpeta donde se guardarán las imágenes temporalmente
const googleCloudController = require('../controllers/googleCloud.controller');

router.post('/detect-text', upload.single('image'), googleCloudController.detectTextFromImage);
    
module.exports = router;

