import data from "./bogota_sectors.json";
import { bogotaLocalities } from "./bogotaLocalities";

export const bogotaSectors = data.features
    .map(({ attributes }) => ({
        code: attributes.SCACODIGO,
        name: attributes.SCANOMBRE,
        locality: bogotaLocalities[attributes.LOCNOMBRE],
    }))
    .filter((sector) => sector.locality && sector.name);