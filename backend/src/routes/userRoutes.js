import express from 'express';
import { createUser } from '../controllers/userController.js';

const routes = express.Router();

// POST /api/users
routes.post('/', createUser);

export default routes;