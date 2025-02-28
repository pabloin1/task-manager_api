// src/controllers/task.controller.ts
import { Request, Response } from 'express';
import { TaskService } from '../services/task.service';
import { ITask } from '../types/task';

export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  createTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const taskData: ITask = {
        ...req.body,
        userId: req.user.id
      };
      
      const task = await this.taskService.createTask(taskData);
      
      res.status(201).json({
        success: true,
        data: task
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };

  getAllTasks = async (req: Request, res: Response): Promise<void> => {
    try {
      const tasks = await this.taskService.getTasks(req.user.id);
      
      res.status(200).json({
        success: true,
        count: tasks.length,
        data: tasks
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

  getTaskById = async (req: Request, res: Response): Promise<void> => {
    try {
      const task = await this.taskService.getTaskById(req.params.id);
      
      if (!task) {
        res.status(404).json({
          success: false,
          message: 'Tarea no encontrada'
        });
        return;
      }
      
      // Verificar que la tarea pertenezca al usuario
      if (task.userId.toString() !== req.user.id) {
        res.status(403).json({
          success: false,
          message: 'No autorizado para acceder a esta tarea'
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        data: task
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

  updateTask = async (req: Request, res: Response): Promise<void> => {
    try {
      // Primero verificar que la tarea exista y pertenezca al usuario
      const existingTask = await this.taskService.getTaskById(req.params.id);
      
      if (!existingTask) {
        res.status(404).json({
          success: false,
          message: 'Tarea no encontrada'
        });
        return;
      }
      
      if (existingTask.userId.toString() !== req.user.id) {
        res.status(403).json({
          success: false,
          message: 'No autorizado para modificar esta tarea'
        });
        return;
      }
      
      const task = await this.taskService.updateTask(req.params.id, req.body);
      
      res.status(200).json({
        success: true,
        data: task
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

  completeTask = async (req: Request, res: Response): Promise<void> => {
    try {
      // Verificar que la tarea exista y pertenezca al usuario
      const existingTask = await this.taskService.getTaskById(req.params.id);
      
      if (!existingTask) {
        res.status(404).json({
          success: false,
          message: 'Tarea no encontrada'
        });
        return;
      }
      
      if (existingTask.userId.toString() !== req.user.id) {
        res.status(403).json({
          success: false,
          message: 'No autorizado para modificar esta tarea'
        });
        return;
      }
      
      const task = await this.taskService.completeTask(req.params.id);
      
      res.status(200).json({
        success: true,
        data: task
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

  deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
      // Verificar que la tarea exista y pertenezca al usuario
      const existingTask = await this.taskService.getTaskById(req.params.id);
      
      if (!existingTask) {
        res.status(404).json({
          success: false,
          message: 'Tarea no encontrada'
        });
        return;
      }
      
      if (existingTask.userId.toString() !== req.user.id) {
        res.status(403).json({
          success: false,
          message: 'No autorizado para eliminar esta tarea'
        });
        return;
      }
      
      await this.taskService.deleteTask(req.params.id);
      
      res.status(200).json({
        success: true,
        data: {}
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };
}