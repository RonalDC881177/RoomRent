import express from "express";
import { createUser, loginUser } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validate.js";
import { createUserSchema } from "../validators/userValidator.js";
import { loginSchema } from "../validators/authValidator.js";

const router = express.Router();

// POST /api/users
router.post("/register", validate(createUserSchema),createUser);
router.post("/login", validate(loginSchema), loginUser);

router.get('/profile', protect, (req, res) => {
  res.json({
    message: 'Ruta protegida',
    user: req.user,
  });
});

export default router;
