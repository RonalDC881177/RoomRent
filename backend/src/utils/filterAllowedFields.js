/**
 * Retorna un nuevo objeto con únicamente los campos permitidos.
 */

const filterAllowedFields = (
    data,
    allowedFields
) => {
    return Object.fromEntries(
        Object.entries(data).filter(
            ([key]) =>
                allowedFields.includes(key)
        )
    );
};

export default filterAllowedFields;