"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const task_service_1 = require("../services/task.service");
class TaskController {
    constructor() {
        this.createTask = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const taskData = Object.assign(Object.assign({}, req.body), { userId: req.user.id });
                const task = yield this.taskService.createTask(taskData);
                res.status(201).json({
                    success: true,
                    data: task
                });
            }
            catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message
                });
            }
        });
        this.getAllTasks = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield this.taskService.getTasks(req.user.id);
                res.status(200).json({
                    success: true,
                    count: tasks.length,
                    data: tasks
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message
                });
            }
        });
        this.getTaskById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield this.taskService.getTaskById(req.params.id);
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
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message
                });
            }
        });
        this.updateTask = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // Primero verificar que la tarea exista y pertenezca al usuario
                const existingTask = yield this.taskService.getTaskById(req.params.id);
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
                const task = yield this.taskService.updateTask(req.params.id, req.body);
                res.status(200).json({
                    success: true,
                    data: task
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message
                });
            }
        });
        this.completeTask = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // Verificar que la tarea exista y pertenezca al usuario
                const existingTask = yield this.taskService.getTaskById(req.params.id);
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
                const task = yield this.taskService.completeTask(req.params.id);
                res.status(200).json({
                    success: true,
                    data: task
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message
                });
            }
        });
        this.deleteTask = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // Verificar que la tarea exista y pertenezca al usuario
                const existingTask = yield this.taskService.getTaskById(req.params.id);
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
                yield this.taskService.deleteTask(req.params.id);
                res.status(200).json({
                    success: true,
                    data: {}
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message
                });
            }
        });
        this.taskService = new task_service_1.TaskService();
    }
}
exports.TaskController = TaskController;
