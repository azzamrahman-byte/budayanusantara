const mongoose = require('mongoose');

const budayaSchema = new mongoose.Schema({
  daerah: String,
  namaBudaya: String,
  jenis: String, 
  deskripsi: String,
  gambar: String, 
  sumber: String  
});

module.exports = mongoose.model('Budaya', budayaSchema);
