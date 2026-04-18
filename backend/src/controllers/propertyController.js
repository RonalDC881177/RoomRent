import Property from '../models/Property.js';

// crear propiedad
export const createProperty = async (req, res) => {
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
      owner: req.user._id,
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

// obtener propiedades
export const getProperties = async (req, res) => {
  try {
    const { location, minPrice, maxPrice, type } = req.query;

    let filter = {};

    if (location) filter.location = location;

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (type) filter.type = type;

    const properties = await Property.find(filter)
    .populate('owner', 'username email').sort({ createdAt: -1});

    res.json(properties);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error al obtener las propiedades',
    });
  }
};

//obtener propiedades del usuario loggeado
export const getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user._id })
      .sort({ createdAt: -1 });

    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// obtener por id
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('owner', 'username email');

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

// actualizar
export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        message: 'Propiedad no encontrada',
      });
    }

    if (property.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: 'No tienes permiso para actualizar esta propiedad',
      });
    }

    const { title, price, location, description } = req.body;

    property.title = title || property.title;
    property.price = price || property.price;
    property.location = location || property.location;
    property.description = description || property.description;

    const updatedProperty = await property.save();

    res.json({
      message: "Propiedad actualizada",
      property: updatedProperty,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al actualizar',
    });
  }
};

/***
 * Eliminar pripiedades.
 * El admin puede eliminar cualquier propiedad.
 * el ususario solo puede eliminar las propiedades que le pertenecen.
 */
export const deleteProperty = async (req, res) => {
  try {

    const { id } = req.params;
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        message: 'Propiedad no encontrada',
      });
    }

    if (property.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({
        message: 'No tienes permiso para eliminar esta propiedad',
      });
    }

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