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
  {
    method: 'PUT',
    path: '/budaya/{id}',
    handler: async (request, h) => {
      try {
        const { id } = request.params;
        const updates = request.payload;

        const updatedBudaya = await Budaya.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedBudaya) {
          return h.response({ status: 'fail', message: 'Data not found' }).code(404);
        }

        return h.response({ status: 'success', data: updatedBudaya }).code(200);
      } catch (err) {
        console.error(err);
        return h.response({ status: 'fail', message: 'Failed to update data' }).code(500);
      }
    },
  },
  {
    method: 'DELETE',
    path: '/budaya/{id}',
    handler: async (request, h) => {
      try {
        const { id } = request.params;

        const deletedBudaya = await Budaya.findByIdAndDelete(id);

        if (!deletedBudaya) {
          return h.response({ status: 'fail', message: 'Data not found' }).code(404);
        }

        return h.response({ status: 'success', message: 'Data deleted successfully' }).code(200);
      } catch (err) {
        console.error(err);
        return h.response({ status: 'fail', message: 'Failed to delete data' }).code(500);
      }
    },
  }
];
