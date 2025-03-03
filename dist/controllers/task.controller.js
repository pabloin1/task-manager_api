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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const task_service_1 = require("../services/task.service");
const mongoose_1 = __importDefault(require("mongoose"));
class TaskController {
    constructor() {
        this.createTask = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const taskData = Object.assign(Object.assign({}, req.body), { userId: req.user.id });
                const task = yield this.taskService.createTask(taskData);
                // Respuesta simplificada: directamente el objeto de tarea
                res.status(201).json(task);
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
                // Respuesta simplificada: directamente el array de tareas
                res.status(200).json(tasks);
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
                const { id } = req.params;
                // Validar que el ID sea un ObjectId válido
                if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                    res.status(400).json({
                        success: false,
                        message: 'ID de tarea inválido'
                    });
                    return;
                }
                const task = yield this.taskService.getTaskById(id);
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
                const { id } = req.params;
                // Validar que el ID sea un ObjectId válido
                if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                    res.status(400).json({
                        success: false,
                        message: 'ID de tarea inválido'
                    });
                    return;
                }
                // Primero verificar que la tarea exista y pertenezca al usuario
                const existingTask = yield this.taskService.getTaskById(id);
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
                const task = yield this.taskService.updateTask(id, req.body);
                // Respuesta simplificada: directamente el objeto de tarea actualizado
                res.status(200).json(task);
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
                const { id } = req.params;
                // Validar que el ID sea un ObjectId válido
                if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                    res.status(400).json({
                        success: false,
                        message: 'ID de tarea inválido'
                    });
                    return;
                }
                // Verificar que la tarea exista y pertenezca al usuario
                const existingTask = yield this.taskService.getTaskById(id);
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
                const task = yield this.taskService.completeTask(id);
                // Respuesta simplificada: directamente el objeto de tarea actualizado
                res.status(200).json(task);
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
                const { id } = req.params;
                // Validar que el ID sea un ObjectId válido
                if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                    res.status(400).json({
                        success: false,
                        message: 'ID de tarea inválido'
                    });
                    return;
                }
                // Verificar que la tarea exista y pertenezca al usuario
                const existingTask = yield this.taskService.getTaskById(id);
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
                yield this.taskService.deleteTask(id);
                // Para eliminar, mantenemos una respuesta vacía con status 204
                res.status(204).end();
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
