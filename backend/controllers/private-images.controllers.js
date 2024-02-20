// * IMPORTS
const Image = require('../models/Image.model');
const { successfulRes, unsuccessfulRes } = require('../lib/response');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const nodemailer = require('nodemailer');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

// * CONTROLLERS
// Create Single Image - POST: /api/v1/private-images
async function createNewPrivateImage(req, res) {
  // ! SAVE TO DB
  const newSecretImageFromDB = await Image.create(req.body);

  // ! CREATE STRIPE PAYMENT LINK
  // Create a new price point for our secret image product
  const price = await stripe.prices.create({
    currency: 'usd',
    unit_amount: ccFee(newSecretImageFromDB.price * 100),
    product: 'prod_PatZ5if6a0fIYV',
  });

  console.log('price:', price);

  // Create a new payment session with that price id
  const paymentLink = await stripe.paymentLinks.create({
    line_items: [
      {
        price: price.id,
        quantity: 1,
      },
    ],
  });

  console.log('paymentLink:', paymentLink);

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

      <a href="${paymentLink.url}">CLICK HERE!</a>
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
  createNewPrivateImage,
  uploadSingleImageToCloudinary,
};
