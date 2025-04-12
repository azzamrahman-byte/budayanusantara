const Budaya = require('../models/budaya');

module.exports = [
  {
    method: 'GET',
    path: '/budaya',
    handler: async (request, h) => {
      const data = await Budaya.find();
      return h.response({ status: 'success', data });
    }
  },
  {
    method: 'POST',
    path: '/budaya',
    handler: async (request, h) => {
      const { daerah, namaBudaya, jenis, deskripsi, gambar, sumber } = request.payload;
      const newBudaya = new Budaya({ daerah, namaBudaya, jenis, deskripsi, gambar, sumber });
      await newBudaya.save();
      return h.response({ status: 'success', message: 'Data budaya berhasil ditambahkan' }).code(201);
    }
  },
  {
    method: 'GET',
    path: '/budaya/{id}',
    handler: async (request, h) => {
      const budaya = await Budaya.findById(request.params.id);
      if (!budaya) {
        return h.response({ status: 'fail', message: 'Data tidak ditemukan' }).code(404);
      }
      return h.response({ status: 'success', data: budaya });
    }
  },
  {
    method: 'PUT',
    path: '/budaya/{id}',
    handler: async (request, h) => {
      const { daerah, namaBudaya, jenis, deskripsi, gambar, sumber } = request.payload;
      const updated = await Budaya.findByIdAndUpdate(request.params.id, { daerah, namaBudaya, jenis, deskripsi, gambar, sumber }, { new: true });
      if (!updated) {
        return h.response({ status: 'fail', message: 'Data tidak ditemukan' }).code(404);
      }
      return h.response({ status: 'success', message: 'Data berhasil diperbarui' });
    }
  },
  {
    method: 'DELETE',
    path: '/budaya/{id}',
    handler: async (request, h) => {
      const deleted = await Budaya.findByIdAndDelete(request.params.id);
      if (!deleted) {
        return h.response({ status: 'fail', message: 'Data tidak ditemukan' }).code(404);
      }
      return h.response({ status: 'success', message: 'Data berhasil dihapus' });
    }
  }
];
