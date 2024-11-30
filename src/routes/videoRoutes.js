const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const videoController = require('../controllers/videoController');
const s3 = require('../config/aws');

// Configuración de multer para cargar archivos a S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME, // Asegúrate de que esta variable de entorno esté correctamente definida
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const uniqueName = `${Date.now().toString()}-${file.originalname}`;
      cb(null, uniqueName); // Genera un nombre único para el archivo
    },
    contentType: multerS3.AUTO_CONTENT_TYPE, // S3 detectará el tipo de contenido automáticamente
  }),
  limits: {
    fileSize: 50 * 1024 * 1024, // Límite de tamaño de archivo: 50MB
  },
});

router.post('/upload', upload.single('video'), videoController.uploadVideo);

module.exports = router;
