import Property from "../models/Property.js";

export const createProperty = async (propertyData) => {
    return await Property.create(propertyData);
};

export const findPropertyById = async (Id) => {
    return await Property.findById(Id)
        .populate(
            "owner",
            "name username email role"
        );
};

export const findMyProperties = async (ownerId) => {
    return await Property.find({
        owner: ownerId,
    }).populate(
        "owner",
        "name username email role"
    );
};

export const findAllProperties = async () => {
    return await Property.find({
        status: { $ne: "inactivo" },
    })
        .populate(
            "owner",
            "name username email role"
        );
};

export const findProperties = async (
    filters = {},
    pagination,
    sort
) => {
    const { skip, limit } = pagination;

    let propertyQuery = Property.find(filters);

    if (sort) {
        propertyQuery = propertyQuery.sort(sort);
    }

    return propertyQuery
        .skip(skip)
        .limit(limit)
        .populate(
            "owner",
            "name username email role"
        );
};

export const findPropertiesByOwner = async (ownerId) => {
    return await Property.find({
        owner: ownerId,
    })
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
