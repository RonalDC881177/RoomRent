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

//obtener listado de propiedades.
const getProperties = async (req, res) => {
  try {
    const { location, minPrice, maxPrice, type } = req.query;

    let filter = {};

    // filtrar por ubicación
    if (location) {
      filter.location = location;
    }

    // filtrar por precio
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // tipo de propiedad
    if (type) {
      filter.type = type;
    }

    const properties = await Property.find(filter).populate('owner', 'name');

    res.json(properties);
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener las propiedades',
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

//actalizar una propiedad.
const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    // 1. verificar si existe
    if (!property) {
      return res.status(404).json({
        message: 'Propiedad no encontrada',
      });
    }

    // 2. verificar dueño
    if (property.owner.toString() !== req.user.id) {
      return res.status(401).json({
        message: 'No autorizado',
      });
    }

    // 3. actualizar
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // devuelve actualizado
    );

    res.status(200).json(updatedProperty);
  } catch (error) {
    res.status(500).json({
      message: 'Error al actualizar',
    });
  }
};


//Eliminar una propiedad.
const deleteProperty = async (req, res) => {
  try {
    // 1. buscar propiedad
    const property = await Property.findById(req.params.id);

    // 2. verificar existencia
    if (!property) {
      return res.status(404).json({
        message: 'Propiedad no encontrada',
      });
    }

    // 3. verificar dueño
    if (property.owner.toString() !== req.user.id) {
      return res.status(401).json({
        message: 'No autorizado',
      });
    }

    // 4. eliminar
    await property.deleteOne();

    res.status(200).json({
      message: 'Propiedad eliminada correctamente',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al eliminar',
    });
  }
};

module.exports = {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty
};
