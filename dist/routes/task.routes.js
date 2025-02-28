"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/task.routes.ts
const express_1 = require("express");
const task_controller_1 = require("../controllers/task.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const router = (0, express_1.Router)();
const taskController = new task_controller_1.TaskController();
// Todas las rutas de tareas requieren autenticación
router.use(auth_middleware_1.authMiddleware);
// Rutas de tareas
router.post('/', validation_middleware_1.validateTask, taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.put('/:id', validation_middleware_1.validateTask, taskController.updateTask);
router.patch('/:id/complete', taskController.completeTask);
router.delete('/:id', taskController.deleteTask);
exports.default = router;
