// src/services/task.service.ts
import { TaskRepository } from '../repositories/task.repository';
import { ITask } from '../types/task';

export class TaskService {
  private taskRepository: TaskRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
  }

  async createTask(taskData: ITask): Promise<ITask> {
    const task = await this.taskRepository.create(taskData);
    return this.taskRepository.toTaskResponse(task);
  }

  async getTasks(userId: string): Promise<ITask[]> {
    const tasks = await this.taskRepository.findAll(userId);
    return this.taskRepository.toTaskResponseList(tasks);
  }

  async getTaskById(id: string): Promise<ITask | null> {
    const task = await this.taskRepository.findById(id);
    return task ? this.taskRepository.toTaskResponse(task) : null;
  }

  async updateTask(id: string, taskData: Partial<ITask>): Promise<ITask | null> {
    const task = await this.taskRepository.update(id, taskData);
    return task ? this.taskRepository.toTaskResponse(task) : null;
  }

  async completeTask(id: string): Promise<ITask | null> {
    const task = await this.taskRepository.update(id, { completed: true });
    return task ? this.taskRepository.toTaskResponse(task) : null;
  }

  async deleteTask(id: string): Promise<ITask | null> {
    const task = await this.taskRepository.delete(id);
    return task ? this.taskRepository.toTaskResponse(task) : null;
  }
}