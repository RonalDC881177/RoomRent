
import { bogotaSectors } from "./bogotaSectors";
import { transformBogotaLocations } from "./transformBogotaLocations";

const bogotaLocations = transformBogotaLocations(bogotaSectors);

export const geographicCatalog = {
    Bogotá: bogotaLocations,
};

export const getCities = () => {
    return Object.keys(geographicCatalog);
};

export const getLocalities = (city) => {
    return Object.keys(geographicCatalog[city] || {});
};

export const getNeighborhoods = (city, locality) => {
    return geographicCatalog[city]?.[locality] || [];
};
