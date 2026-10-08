import { bogotaSectors } from "./bogotaSectors";

export const transformBogotaLocations = (sectors) => {
    const locations = {};

    for (const sector of sectors) {
        const { locality, name } = sector;

        if (!locality || !name) {
            continue;
        }

        if (!locations[locality]) {
            locations[locality] = [];
        }

        locations[locality].push(name);
    }

    return locations;
};

console.log(
    transformBogotaLocations(bogotaSectors)
);