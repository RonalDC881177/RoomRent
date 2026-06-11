import User from "../models/User.js";

export const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

export const createUserRepository = async (userData) => {
    return await User.create(userData);
};

export const findUserForLogin = async (identifier) => {
    return await User.findOne({
        $or: [
            { email: identifier },
            { username: identifier },
        ],
    }).select("+password");
};