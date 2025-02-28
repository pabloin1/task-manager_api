// src/routes/task.routes.ts
import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateTask } from '../middlewares/validation.middleware';

const router = Router();
const taskController = new TaskController();

// Todas las rutas de tareas requieren autenticación
router.use(authMiddleware);

// Rutas de tareas
router.post('/', validateTask, taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.put('/:id', validateTask, taskController.updateTask);
router.patch('/:id/complete', taskController.completeTask);
router.delete('/:id', taskController.deleteTask);

export default router;