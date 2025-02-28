"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/user.routes.ts
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const router = (0, express_1.Router)();
const authController = new auth_controller_1.AuthController();
// Rutas públicas
router.post('/register', validation_middleware_1.validateUser, authController.register);
router.post('/login', validation_middleware_1.validateLogin, authController.login);
exports.default = router;
