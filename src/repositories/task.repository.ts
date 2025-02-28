// src/repositories/task.repository.ts
import Task, { TaskDocument } from '../models/task.model';
import { ITask } from '../types/task';

export class TaskRepository {
  async create(taskData: ITask): Promise<TaskDocument> {
    const task = new Task(taskData);
    return await task.save();
  }

  async findById(id: string): Promise<TaskDocument | null> {
    return await Task.findById(id);
  }

  async findAll(userId: string): Promise<TaskDocument[]> {
    return await Task.find({ userId });
  }

  async update(id: string, taskData: Partial<ITask>): Promise<TaskDocument | null> {
    return await Task.findByIdAndUpdate(id, taskData, { new: true });
  }

  async delete(id: string): Promise<TaskDocument | null> {
    return await Task.findByIdAndDelete(id);
  }

  // Método helper para convertir un TaskDocument a ITask con type casting
  toTaskResponse(task: TaskDocument): ITask {
    return {
      _id: (task._id as any).toString(),
      title: task.title,
      description: task.description,
      completed: task.completed,
      userId: (task.userId as any).toString(),
      createdAt: task.createdAt,
      updatedAt: task.updatedAt
    };
  }

  // Método helper para convertir una lista de TaskDocument a ITask[]
  toTaskResponseList(tasks: TaskDocument[]): ITask[] {
    return tasks.map(task => this.toTaskResponse(task));
  }
}