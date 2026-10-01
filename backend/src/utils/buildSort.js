const allowedSortFields = {
    price: "price.amount",
    createdAt: "createdAt",
    views: "views",
};

const buildSort = (query) => {

    // si no hay sort → undefined

    if (!query.sort) {
        return undefined;
    }

    // determinar dirección
    const direction = query.sort.startsWith("-")
    ? -1
    : 1;

     // obtener campo
    const field = query.sort.replace("-", "");

    // comprobar que el campo esté permitido
    const sortField = allowedSortFields[field];

    // construir objeto
    if (sortField) {
        return {[sortField]: direction};
    }

};

export default buildSort;