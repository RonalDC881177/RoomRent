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
    if (query[field]) {
        filters[field] = query[field];
    }
}

return filters;

};

export default buildPropertyFilters;