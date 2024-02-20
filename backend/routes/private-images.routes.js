// * IMPORTS
const router = require('express').Router();

const {
  createNewPrivateImage,
  uploadSingleImageToCloudinary,
} = require('../controllers/private-images.controllers.js');

// * ROUTES
// POST Single Private Image
router.post('/', createNewPrivateImage);

// POST Single Image Upload to Cloudinary
router.post('/upload', uploadSingleImageToCloudinary);

// * EXPORTS
module.exports = router;
