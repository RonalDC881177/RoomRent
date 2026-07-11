import mongoose from "mongoose";
import {
    PROPERTY_TYPES,
    PROPERTY_STATUS,
    PRICE_PERIODS,
    DEFAULT_CURRENCY,
    DEFAULT_PERIOD,
} from "../constants/propertyConstants.js";

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
      enum: PROPERTY_TYPES
    },

    price: {
      amount: {
        type: Number,
        required: true,
      },

      currency: {
        type: String,
        default: DEFAULT_CURRENCY
      },

      period: {
        type: String,
        enum: PRICE_PERIODS,
        default: DEFAULT_PERIOD
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
      enum: PROPERTY_STATUS,
      default: DEFAULT_STATUS
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