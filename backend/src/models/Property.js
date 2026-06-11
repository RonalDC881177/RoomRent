import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    propertyType: {
      type: String,
      required: true,
      enum: [
        "habitacion",
        "apartamento",
        "casa",
        "apartaestudio",
      ],
    },

    price: {
      amount: {
        type: Number,
        required: true,
      },

      currency: {
        type: String,
        default: "COP",
      },

      period: {
        type: String,
        enum: ["daily", "weekly", "monthly"],
        default: "monthly",
      },
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    locality: {
      type: String,
      trim: true,
    },

    neighborhood: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },

    bedrooms: {
      type: Number,
      default: 1,
    },

    bathrooms: {
      type: Number,
      default: 1,
    },

    amenities: [
      {
        type: String,
      },
    ],

    images: [
      {
        type: String,
      },
    ],

    status: {
      type: String,
      enum: [
        "disponible",
        "reservado",
        "ocupado",
        "inactivo",
      ],
      default: "disponible",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    views: {
      type: Number,
      default: 0,
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Property =
  mongoose.models.Property ||
  mongoose.model("Property", propertySchema);

export default Property;