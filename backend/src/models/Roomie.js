import mongoose from "mongoose";

const roomieSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        city: {
            type: String,
            required: true,
            trim: true,
        },

        locality: {
            type: String,
            required: true,
            trim: true,
        },

        maxBudget: {
            type: Number,
            required: true,
            min: 0,
        },

        moveInDate: {
            type: Date,
            required: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
            minlength: 20,
            maxlength: 1000,
        },

        preferences: {
            type: [String],
            default: [],
        },

        active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Roomie =
    mongoose.models.Roomie ||
    mongoose.model("Roomie", roomieSchema);

export default Roomie;