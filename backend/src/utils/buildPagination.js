const buildPagination = (query) => {
    const { page, limit } = query;

    const skip = (page - 1) * limit;

    return {
        page,
        limit,
        skip
    };
};

export default buildPagination;