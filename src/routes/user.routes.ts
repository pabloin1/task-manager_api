// src/routes/user.routes.ts
import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateUser, validateLogin } from '../middlewares/validation.middleware';

const router = Router();
const authController = new AuthController();

// Rutas públicas
router.post('/register', validateUser, authController.register);
router.post('/login', validateLogin, authController.login);

export default router;