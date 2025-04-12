require('dotenv').config();
const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const dataRoutes = require('./routes/index.js');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: 'localhost'
  });

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
  }

  server.route(dataRoutes);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

init();
