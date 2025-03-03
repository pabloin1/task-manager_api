// src/controllers/task.controller.ts
import { Request, Response } from 'express';
import { TaskService } from '../services/task.service';
import { ITask } from '../types/task';
import mongoose from 'mongoose';

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
      
      // Respuesta simplificada: directamente el objeto de tarea
      res.status(201).json(task);
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
      
      // Respuesta simplificada: directamente el array de tareas
      res.status(200).json(tasks);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

  getTaskById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      
      // Validar que el ID sea un ObjectId válido
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({
          success: false,
          message: 'ID de tarea inválido'
        });
        return;
      }
      
      const task = await this.taskService.getTaskById(id);
      
      if (!task) {
        res.status(404).json({
          success: false,
          message: 'Tarea no encontrada'
        });
        return;
      }
      
      // Verificar que la tarea pertenezca al usuario
      if (task.userId !== req.user.id) {
        res.status(403).json({
          success: false,
          message: 'No autorizado para acceder a esta tarea'
        });
        return;
      }
      
      // Respuesta simplificada: directamente el objeto de tarea
      res.status(200).json(task);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

  updateTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      
      // Validar que el ID sea un ObjectId válido
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({
          success: false,
          message: 'ID de tarea inválido'
        });
        return;
      }
      
      // Primero verificar que la tarea exista y pertenezca al usuario
      const existingTask = await this.taskService.getTaskById(id);
      
      if (!existingTask) {
        res.status(404).json({
          success: false,
          message: 'Tarea no encontrada'
        });
        return;
      }
      
      if (existingTask.userId !== req.user.id) {
        res.status(403).json({
          success: false,
          message: 'No autorizado para modificar esta tarea'
        });
        return;
      }
      
      const task = await this.taskService.updateTask(id, req.body);
      
      // Respuesta simplificada: directamente el objeto de tarea actualizado
      res.status(200).json(task);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

  completeTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      
      // Validar que el ID sea un ObjectId válido
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({
          success: false,
          message: 'ID de tarea inválido'
        });
        return;
      }
      
      // Verificar que la tarea exista y pertenezca al usuario
      const existingTask = await this.taskService.getTaskById(id);
      
      if (!existingTask) {
        res.status(404).json({
          success: false,
          message: 'Tarea no encontrada'
        });
        return;
      }
      
      if (existingTask.userId !== req.user.id) {
        res.status(403).json({
          success: false,
          message: 'No autorizado para modificar esta tarea'
        });
        return;
      }
      
      const task = await this.taskService.completeTask(id);
      
      // Respuesta simplificada: directamente el objeto de tarea actualizado
      res.status(200).json(task);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

  deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      
      // Validar que el ID sea un ObjectId válido
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({
          success: false,
          message: 'ID de tarea inválido'
        });
        return;
      }
      
      // Verificar que la tarea exista y pertenezca al usuario
      const existingTask = await this.taskService.getTaskById(id);
      
      if (!existingTask) {
        res.status(404).json({
          success: false,
          message: 'Tarea no encontrada'
        });
        return;
      }
      
      if (existingTask.userId !== req.user.id) {
        res.status(403).json({
          success: false,
          message: 'No autorizado para eliminar esta tarea'
        });
        return;
      }
      
      await this.taskService.deleteTask(id);
      
      // Para eliminar, mantenemos una respuesta vacía con status 204
      res.status(204).end();
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };
}