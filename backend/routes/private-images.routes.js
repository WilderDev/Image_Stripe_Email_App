// * IMPORTS
const router = require('express').Router();

const {
  getSinglePrivateImage,
  createNewPrivateImage,
  uploadSingleImageToCloudinary,
} = require('../controllers/private-images.controllers.js');

// * ROUTES
// POST Single Private Image
router.post('/', createNewPrivateImage);

// GET Single Private Image (By Id)
router.get('/:id', getSinglePrivateImage);

// POST Single Image Upload to Cloudinary
router.post('/upload', uploadSingleImageToCloudinary);

// * EXPORTS
module.exports = router;
