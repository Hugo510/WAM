const vision = require('@google-cloud/vision');
const fs = require('fs');
const path = require('path');
const debug = require('debug')('app:google-cloud');
const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

exports.detectTextFromImage = async (req, res) => {
  try {
    // Verificar si se recibió un archivo
    if (!req.file) {
      debug('Error: No se recibió ningún archivo en la solicitud.');
      return res.status(400).json({
        error: 'No se recibió ningún archivo. Por favor, sube una imagen.',
      });
    }

    const filePath = req.file.path;

    // Verificar que el archivo exista en el sistema de archivos
    if (!fs.existsSync(filePath)) {
      debug(`Error: El archivo no se encuentra en la ruta ${filePath}.`);
      return res.status(400).json({
        error: 'El archivo no se encuentra disponible. Por favor, intenta de nuevo.',
      });
    }

    // Procesar la imagen con la API de Google Vision
    debug('Iniciando detección de texto con Google Vision API.');
    const [result] = await client.textDetection(filePath); // Realiza OCR con Google Vision
    const detections = result.textAnnotations;

    // Validar si se detectó texto
    if (!detections || detections.length === 0) {
      debug('No se detectó texto en la imagen.');
      return res.status(200).json({
        text: 'No se detectó texto en la imagen.',
      });
    }

    // Respuesta exitosa con el texto detectado
    debug('Texto detectado exitosamente.');
    res.status(200).json({
      text: detections[0].description,
    });

  } catch (error) {
    // Log detallado del error
    error('Error al procesar la imagen:', error);

    // Errores específicos de la API de Google Vision
    if (error.code === 400) {
      return res.status(400).json({
        error: 'Solicitud inválida. Revisa la imagen y vuelve a intentar.',
      });
    }

    // Error genérico del servidor
    res.status(500).json({
      error: 'Ocurrió un error al procesar la imagen. Inténtalo de nuevo más tarde.',
      message: error.message,
    });
  } finally {
    // Elimina el archivo temporalmente subido
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error('Error al eliminar el archivo temporal:', err);
        } else {
          console.debug('Archivo temporal eliminado correctamente:', req.file.path);
        }
      });
    }
  }
};
