const Budaya = require('../models/budaya');

module.exports = [
  {
    method: 'GET',
    path: '/budaya',
    handler: async (request, h) => {
      try {
        const data = await Budaya.find();
        return h.response({ status: 'success', data }).code(200);
      } catch (err) {
        console.error(err);
        return h.response({ status: 'fail', message: 'Failed to fetch data' }).code(500);
      }
    },
  },
  {
    method: 'POST',
    path: '/budaya',
    handler: async (request, h) => {
      try {
        const { daerah, namaBudaya, jenis, deskripsi, gambar, sumber } = request.payload;

        if (!daerah || !namaBudaya || !jenis || !deskripsi) {
          return h.response({ status: 'fail', message: 'Missing required fields' }).code(400);
        }

        const newBudaya = new Budaya({ daerah, namaBudaya, jenis, deskripsi, gambar, sumber });
        const savedBudaya = await newBudaya.save();

        return h.response({ status: 'success', data: savedBudaya }).code(201);
      } catch (err) {
        console.error(err);
        return h.response({ status: 'fail', message: 'Failed to save data' }).code(500);
      }
    },
  },
];