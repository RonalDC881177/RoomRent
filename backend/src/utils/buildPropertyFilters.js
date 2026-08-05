const buildPropertyFilters = (query) => {
    const filters = {};

    const allowedFilters = [
        "city",
        "status",
        "propertyType",
        "bedrooms",
        "bathrooms"
    ];

    for (const field of allowedFilters) {
        if (query[field] !== undefined) {
            filters[field] = query[field];
        }
    }

    if (
    query.minPrice !== undefined ||
    query.maxPrice !== undefined
) {
    filters["price.amount"] = {};

    if (query.minPrice !== undefined) {
        filters["price.amount"].$gte =
            query.minPrice;
    }

    if (query.maxPrice !== undefined) {
        filters["price.amount"].$lte =
            query.maxPrice;
    }
}

return filters;
};

export default buildPropertyFilters;