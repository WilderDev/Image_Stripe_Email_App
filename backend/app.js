// * IMPORTS
require('dotenv').config(); // TODO: Create .env File and Add MONGO_URI & PORT variables
require('express-async-errors');

const path = require('path');
const express = require('express');
const app = express();

// TODO: FILE IMAGE UPLOAD
// TODO: Cloudinary (v2): https://console.cloudinary.com/pm/c-680c21cdfa7846b2ca10021acca735/getting-started

const connectToMongo = require('./lib/mongoose');
const { PORT, SERVER_URL } = require('./lib/constants');

// * MIDDLEWAREs
app.use(express.static('../public'));
app.use(express.json()); // Body Parser
// TODO: FILE IMAGE UPLOAD

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
