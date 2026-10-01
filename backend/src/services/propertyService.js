import AppError from '../errors/AppError.js';
import {
    createProperty,
    findPropertyById,
    findProperties,                                     
    findMyProperties,
    findPropertiesByOwner,
    updateProperty,
    countProperties,
    deactivateProperty,
} from '../repositories/propertyRepository.js';
import {
    ALLOWED_PROPERTY_UPDATE_FIELDS,
} from "../constants/propertyConstants.js";
import buildPropertyFilters from "../utils/buildPropertyFilters.js";
import filterAllowedFields from "../utils/filterAllowedFields.js";
import buildPagination from "../utils/buildPagination.js";
import buildSort from "../utils/buildSort.js";


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

export const getMyPropertiesService = async (user) => {
    const properties = await findPropertiesByOwner(user._id);

    return properties;
};

export const getAllPropertiesService = async (query) => {

    const filters = buildPropertyFilters(query);
    const pagination = buildPagination(query);
    const sort = buildSort(query);
    const properties = await findProperties(filters, pagination, sort);
    const total = await countProperties(filters);
    const totalPages = Math.ceil(total / pagination.limit);
    const hasNext = pagination.page < totalPages;
    const hasPrev = pagination.page > 1;

    return {
        properties,
        pagination: {
            page: pagination.page,
            limit: pagination.limit,
            total,
            totalPages,
            hasNext,
            hasPrev,
        },
    };

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
    const filteredData = filterAllowedFields(
        updateData,
        ALLOWED_PROPERTY_UPDATE_FIELDS
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