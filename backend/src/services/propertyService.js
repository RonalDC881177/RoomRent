import AppError from '../errors/AppError.js';
import {
    createProperty,
    findPropertyById,
    findAllProperties,
    updateProperty
} from '../repositories/propertyRepository.js';


export const createPropertyService = async (propertyData, user) => {

    if (
        user.role !== "admin" &&
        user.role !== "arrendador"
    ) {
        throw new AppError("No tienes permisos para crear una propiedad", 403);
    }

    const property = await createProperty({
        ...propertyData,
        owner: user._id,
    });

    return property;
};

export const getPropertyByIdService = async (propertyId) => {
    const property = await findPropertyById(propertyId);

    if (!property) {
        throw new AppError('propiedad no encontrada', 404);
    }

    return property;

};

export const getAllPropertiesService = async () => {
    const properties = await findAllProperties();

    return properties;
};

export const updatePropertyService = async (propertyId, updateData, user) => {
    const property = await findPropertyById(propertyId);

    if (!property) {
        throw new AppError('Propiedad no encontrada', 404);
    }

    // Verificar permisos del usuario
    if (property.owner.toString() !== user._id.toString()) {
        throw new AppError('No tienes permisos para actualizar esta propiedad', 403);
    }

    const updatedProperty = await updateProperty(propertyId, updateData);
    return updatedProperty;
};

export const deletePropertyService = async (propertyId, user) => { };