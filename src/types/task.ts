// src/types/task.ts
export interface ITask {
  _id?: string;
  title: string;
  description?: string;
  completed: boolean;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
