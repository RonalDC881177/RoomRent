const Property = require('../models/Property');

// crear propiedad
const createProperty = async (req, res) => {
  try {
    const { title, price, location, description } = req.body;

    if (!title || !price || !location) {
      return res.status(400).json({
        message: 'Faltan campos obligatorios',
      });
    }

    const property = await Property.create({
      title,
      price,
      location,
      description,
      owner: req.user.id, // 🔥 clave aquí
    });

    res.status(201).json({
      message: 'Propiedad creada',
      property,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error del servidor',
    });
  }
};

module.exports = {
  createProperty,
};

//obtener listado de propiedades.
const getProperties = async (req, res) => {
  try {
    const properties = await Property.find()
      .populate('propietarios', 'name email');

    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener propiedades',
    });
  }
};

//optener una sola propiedad
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('propietario', 'name email');

    if (!property) {
      return res.status(404).json({
        message: 'Propiedad no encontrada',
      });
    }

    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener la propiedad',
    });
  }
};