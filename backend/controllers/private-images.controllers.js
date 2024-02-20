// * IMPORTS
const Image = require('../models/Image.model');
const { successfulRes, unsuccessfulRes } = require('../lib/response');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// * CONTROLLERS
// TODO: Get a Single Image - GET: /api/v1/private-images/:id
async function getSinglePrivateImage(req, res) {
  // TODO

  // Send Successful Response
  return successfulRes({
    res,
    data: {
      image: {
        // TODO
      },
    },
  });
}

// Create Single Image - POST: /api/v1/private-images
async function createNewPrivateImage(req, res) {
  const newSecretImageFromDB = await Image.create(req.body);

  // Send Successful Response
  return successfulRes({
    res,
    status: 201,
    data: {
      image: newSecretImageFromDB,
    },
  });
}

// Create Single Image Upload - POST: /api/v1/private-images/upload
async function uploadSingleImageToCloudinary(req, res) {
  const img = req.files.image.tempFilePath;

  const result = await cloudinary.uploader.upload(img, {
    folder: 'secret-images',
    use_filename: true,
  });

  fs.unlinkSync(img);

  // Send Successful Response
  return successfulRes({
    res,
    status: 200,
    data: {
      image: {
        src: result.secure_url,
      },
    },
  });
}

// * EXPORTS
module.exports = {
  getSinglePrivateImage,
  createNewPrivateImage,
  uploadSingleImageToCloudinary,
};
