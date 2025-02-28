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
exports.TaskService = void 0;
// src/services/task.service.ts
const task_repository_1 = require("../repositories/task.repository");
class TaskService {
    constructor() {
        this.taskRepository = new task_repository_1.TaskRepository();
    }
    createTask(taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.taskRepository.create(taskData);
            return this.taskRepository.toTaskResponse(task);
        });
    }
    getTasks(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = yield this.taskRepository.findAll(userId);
            return this.taskRepository.toTaskResponseList(tasks);
        });
    }
    getTaskById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.taskRepository.findById(id);
            return task ? this.taskRepository.toTaskResponse(task) : null;
        });
    }
    updateTask(id, taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.taskRepository.update(id, taskData);
            return task ? this.taskRepository.toTaskResponse(task) : null;
        });
    }
    completeTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.taskRepository.update(id, { completed: true });
            return task ? this.taskRepository.toTaskResponse(task) : null;
        });
    }
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.taskRepository.delete(id);
            return task ? this.taskRepository.toTaskResponse(task) : null;
        });
    }
}
exports.TaskService = TaskService;
