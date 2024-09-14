const vision = require('@google-cloud/vision');
const fs = require('fs');
const User = require('../models/user.model');  // Modelo de Usuario
const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,  // Ruta a las credenciales de Google Vision en .env
});

exports.uploadCredentialAndDetectText = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Por favor, sube una imagen.' });
    }

    const filePath = req.file.path;
    const userId = req.body.userId;  // Se recibe el ID del usuario

    // Buscar al usuario en la base de datos
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    // Leer la imagen como un Buffer (binario)
    const imageBuffer = fs.readFileSync(filePath);

    // Realiza el OCR con Google Vision
    const [result] = await client.textDetection(filePath);
    const detections = result.textAnnotations;
    const detectedText = detections[0] ? detections[0].description : 'No se detectó texto.';

    // Guardar la ruta de la imagen, la imagen en formato binario y el texto extraído en la base de datos
    user.credential = filePath;
    user.image = imageBuffer;  // Guardar la imagen como binario
    user.detectedText = detectedText;
    await user.save();

    res.status(200).json({
      message: 'Imagen subida y texto detectado con éxito.',
      detectedText: detectedText,
    });

  } catch (error) {
    console.error('Error al procesar la imagen:', error);
    res.status(500).json({
      error: 'Error al procesar la imagen. Inténtalo de nuevo.',
    });
  } finally {
    // Eliminar el archivo temporalmente subido
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error al eliminar el archivo:', err);
      });
    }
  }
};
