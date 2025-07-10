const mongoose = require('mongoose');

const estudianteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  assignment: { type: String, required: true },
  average: { type: Number, required: true }
});

module.exports = mongoose.model('Estudiante', estudianteSchema);