import express from "express";
import {
  createProperty,
  getAllProperties,
  getMyProperties,
  getPropertyById,
  updateProperty,
  deleteProperty
} from "../controllers/propertyController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validate.js";
import {
  createPropertySchema,
  updatePropertySchema,
  getPropertiesQuerySchema,
  getPropertyByIdSchema
} from "../validators/propertyValidator.js";

const router = express.Router();

router.get("/", validate(getPropertiesQuerySchema, "query"), getAllProperties);
router.get("/my", protect, getMyProperties);
router.get("/:id", validate(getPropertyByIdSchema, "params"), getPropertyById);
router.post("/", protect, validate(createPropertySchema), createProperty);
router.put("/:id", protect, validate(updatePropertySchema, "body"), updateProperty);
router.delete("/:id", protect, deleteProperty);

export default router;