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

export const updatePropertyService = async (
    propertyId,
    updateData,
    user
) => {

    const property = await findPropertyById(
        propertyId
    );

    if (!property) {
        throw new AppError(
            "Propiedad no encontrada",
            404
        );
    }

    const isOwner =
        property.owner._id.toString() ===
        user._id.toString();

    const isAdmin =
        user.role === "admin";

    if (!isOwner && !isAdmin) {
        throw new AppError(
            "No tienes permisos para actualizar esta propiedad",
            403
        );
    }
    const allowedFields = [
        "title",
        "description",
        "price",
        "address",
        "bedrooms",
        "bathrooms",
        "amenities",
        "images",
        "status",
    ];

    const filteredData = filterAllowedFields(
        updateData,
        allowedFields
    );

    const updatedProperty = await updateProperty(
        propertyId,
        filteredData
    );

    if (Object.keys(filteredData).length === 0) {
        throw new AppError(
            "No hay campos válidos para actualizar",
            400
        );
    }

    return updatedProperty;
};

export const deletePropertyService = async (propertyId, user) => {

    const property = await findPropertyById(
        propertyId
    )

    if (!property) {
        throw new AppError("Propiedad no encontrada", 404);
    }

    const isOwner =
        property.owner._id.toString() ===
        user._id.toString();

    const isAdmin =
        user.role === "admin";

    if (!isOwner && !isAdmin) {
        throw new AppError("No tienes permisos para desactivar esta propiedad", 403);
    }

    const propertyDeactivated =
        await deactivateProperty(
            propertyId
        );

    return propertyDeactivated;
};