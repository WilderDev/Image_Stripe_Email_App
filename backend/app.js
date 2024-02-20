// * IMPORTS
require('dotenv').config();
require('express-async-errors');

const path = require('path');
const express = require('express');
const app = express();

const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dqdt3b71o',
  api_key: '893945678668897',
  api_secret: 'zTaXHnfUwZ3n3IYWiPJkGCVriQs',
});

const connectToMongo = require('./lib/mongoose');
const { PORT, SERVER_URL } = require('./lib/constants');

// * MIDDLEWARES
app.use(express.static('../public'));
app.use(express.json()); // Body Parser
app.use(
  fileUpload({
    useTempFiles: true,
  }),
);

// * ROUTES
app.use('/api/v1/private-images', require('./routes/private-images.routes'));
app.use('/', (_, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/index.html'));
});

// * START SERVER & DB
(async () => {
  try {
    await connectToMongo(process.env.MONGO_URI); // Start Database

    app.listen(PORT, () => console.log(`Server Listening: ${SERVER_URL}`)); // Start Server
  } catch (err) {
    console.log('ERROR:', err);
  }
})();
