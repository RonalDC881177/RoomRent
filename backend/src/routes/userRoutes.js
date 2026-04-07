import express from 'express';
import { createUser } from '../controllers/userController.js';

const routes = express.Router();

// POST /api/users
routes.post('/', createUser);
routes.post('/login', loginUser);

export default routes;

const protect = require('../middlewares/authMiddleware');

router.get('/profile', protect, (req, res) => {
  res.json({
    message: 'Ruta protegida',
    user: req.user,
  });
});