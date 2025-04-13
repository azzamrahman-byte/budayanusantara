const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const dataRoutes = require('./routes/index.js');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: '0.0.0.0',
  });

  const uri = "mongodb+srv://chainsawman1668:kaMenriDe@azzam.c01scxw.mongodb.net/budaya?retryWrites=true&w=majority&appName=Azzam";

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }

  server.route(dataRoutes);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();
