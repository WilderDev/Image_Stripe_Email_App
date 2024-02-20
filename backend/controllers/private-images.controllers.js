// * IMPORTS
const Image = require('../models/Image.model');
const { successfulRes, unsuccessfulRes } = require('../lib/response');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const nodemailer = require('nodemailer');

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
  // ! SAVE TO DB
  const newSecretImageFromDB = await Image.create(req.body);

  // ! SEND EMAIL
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'mandy.corkery97@ethereal.email',
      pass: '9VvDQfFMTR9PTGFBn1',
    },
  });

  const email = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: newSecretImageFromDB.recipient,
    subject: newSecretImageFromDB.subject,
    html: `
      <h1>I took a pic for you...</h1>

      <img src="${newSecretImageFromDB.image}" alt="" style="width: 250px; height: 250px" />

      <h2>Want more?</h2>

      <a href="https://google.com">CLICK HERE!</a>
     `,
  });

  // Send Successful Response
  return successfulRes({
    res,
    status: 201,
    data: {
      email,
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
