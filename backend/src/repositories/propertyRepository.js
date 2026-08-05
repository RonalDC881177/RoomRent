import Property from "../models/Property.js";

export const createProperty = async (propertyData) => {
    return await Property.create(propertyData);
};

export const findPropertyById = async (propertyId) => {
    return await Property.findById(propertyId)
        .populate(
            "owner",
            "name username email role"
        );
};

export const findAllProperties = async () => {
    return await Property.find()
        .populate(
            "owner",
            "name username email role"
        );
};

export const findProperties = async (
    filters = {},
    pagination
) => {

    const { skip, limit } = pagination;

    return Property.find(filters)
        .skip(skip)
        .limit(limit)
        .populate(
            "owner",
            "name username email role"
        );
};

export const countProperties =async (filters = {}) => {
    
    return Property .countDocuments(filters);
}

export const updateProperty = async (
    propertyId,
    updateData
) => {
    return await Property.findByIdAndUpdate(
        propertyId,
        updateData,
        {
            new: true,
            runValidators: true,
        }
    );
};

export const deactivateProperty = async (
    propertyId
) => {
    return await Property.findByIdAndUpdate(
        propertyId,
        {
            status: "inactivo",
        },
        {
            new: true,
            runValidators: true,
        }
    );
};

