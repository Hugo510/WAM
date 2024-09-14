const { Storage } = require('@google-cloud/storage');
require('dotenv').config();

const storage = new Storage({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS, // Cargar el archivo de credenciales desde .env
  projectId: 'sonic-falcon-435601-h2', // Project ID del JSON
});

module.exports = storage;
