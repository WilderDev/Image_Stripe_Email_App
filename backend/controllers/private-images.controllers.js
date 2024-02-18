// * IMPORTS
const Image = require('../models/Image.model');
const { successfulRes, unsuccessfulRes } = require('../lib/response');

// * CONTROLLERS
// TODO: Get a Single Image - GET: /api/v1/images/:id
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

// TODO: Create Single Image - POST: /api/v1/images
async function createNewPrivateImage(req, res) {
  // TODO

  // Send Successful Response
  return successfulRes({
    res,
    status: 201,
    data: {
      image: {}, // TODO
    },
  });
}

// TODO: Create Single Image Upload - POST: /api/v1/images/upload
async function uploadSingleImageToCloudinary(req, res) {
  // TODO

  console.log('req.body:', req.body);

  // Send Successful Response
  return successfulRes({
    res,
    status: 200,
    data: {
      image: {
        src: 'taco.jpg',
      }, // TODO
    },
  });
}

// * EXPORTS
module.exports = {
  getSinglePrivateImage,
  createNewPrivateImage,
  uploadSingleImageToCloudinary,
};
