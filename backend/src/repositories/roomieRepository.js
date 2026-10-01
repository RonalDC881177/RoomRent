import Roomie from "../models/Roomie.js";

export const createRoomie = async (roomieData) => {
    return await Roomie.create(roomieData);
};

export const findRoomieById = async (id) => {
    return await Roomie.findById(id)
        .populate(
            "owner",
            "name username email role"
        );
};

export const findRoomieByOwner = async (ownerId) => {
    return await Roomie.findOne({
        owner: ownerId,
        active: true,
    }).populate(
        "owner",
        "name username email role"
    );
};

export const findActiveRoomies = async () => {
    return await Roomie.find({
        active: true,
    }).populate(
        "owner",
        "name username email role"
    );
};

export const updateRoomie = async (id, updateData) => {
    return await Roomie.findByIdAndUpdate(
        id,
        updateData,
        {
            new: true,
            runValidators: true,
        }
    ).populate(
        "owner",
        "name username email role"
    );
};

export const deactivateRoomie = async (id) => {
    return await Roomie.findByIdAndUpdate(
        id,
        {
            active: false,
        },
        {
            new: true,
            runValidators: true,
        }
    ).populate(
        "owner",
        "name username email role"
    );
};