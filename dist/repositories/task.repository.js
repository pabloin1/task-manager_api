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
exports.TaskRepository = void 0;
// src/repositories/task.repository.ts
const task_model_1 = __importDefault(require("../models/task.model"));
class TaskRepository {
    create(taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = new task_model_1.default(taskData);
            return yield task.save();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield task_model_1.default.findById(id);
        });
    }
    findAll(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield task_model_1.default.find({ userId });
        });
    }
    update(id, taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield task_model_1.default.findByIdAndUpdate(id, taskData, { new: true });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield task_model_1.default.findByIdAndDelete(id);
        });
    }
    // Método helper para convertir un TaskDocument a ITask con type casting
    toTaskResponse(task) {
        return {
            _id: task._id.toString(),
            title: task.title,
            description: task.description,
            completed: task.completed,
            userId: task.userId.toString(),
            createdAt: task.createdAt,
            updatedAt: task.updatedAt
        };
    }
    // Método helper para convertir una lista de TaskDocument a ITask[]
    toTaskResponseList(tasks) {
        return tasks.map(task => this.toTaskResponse(task));
    }
}
exports.TaskRepository = TaskRepository;
