const Estudiante = require('../models/Estudiante');

exports.crear = async (req, res) => {
  try {
    console.log(req.body); // 👈 esto nos ayuda a ver qué datos llegan
    const nuevo = new Estudiante(req.body);
    const guardado = await nuevo.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listar = async (req, res) => {
  try {
    const estudiantes = await Estudiante.find();
    res.status(200).json(estudiantes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const actualizado = await Estudiante.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(actualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    await Estudiante.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};