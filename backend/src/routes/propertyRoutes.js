const express = require("express");
const router = express.Router();

const {
  createProperty,
  getProperties,
  getPropertyById,
} = require("../controllers/propertyController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/", getProperties);
router.get("/:id", getPropertyById);
router.post("/", protect, createProperty);
router.put('/:id', protect, updateProperty);
router.delete('/:id', protect, deleteProperty);


module.exports = router;
