import express from "express";
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty } from "../controllers/propertyController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validate.js";
import { 
  createPropertySchema, 
  updatePropertySchema } from "../validators/propertyValidator.js";

const router = express.Router();

router.get("/", getAllProperties);
router.get("/:id", getPropertyById);
router.post("/", protect, validate(createPropertySchema), createProperty);
router.put("/:id", protect, validate(updatePropertySchema), updateProperty);
router.delete("/:id", protect, deleteProperty);

export default router;