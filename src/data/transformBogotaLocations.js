import { bogotaSectors } from "./bogotaSectors";

export const transformBogotaLocations = (sectors) => {
    const locations = {};

    for (const sector of sectors) {
        const { locality, name } = sector;

        if (!locality || !name) {
            continue;
        }

        if (!locations[locality]) {
            locations[locality] = new Set();
        }

        locations[locality].add(name);
    }


    return Object.fromEntries(
        Object.entries(locations)
            .map(([locality, names]) => [
                locality,
                [...names].sort((a, b) => a.localeCompare(b, "es")),
            ])
            .sort(([a], [b]) => a.localeCompare(b, "es"))
    );
};