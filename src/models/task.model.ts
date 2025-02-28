// src/models/task.model.ts
import mongoose, { Schema, Document } from 'mongoose';
import { ITask } from '../types/task';

// Omitimos _id de ITask para evitar conflictos con Document
export interface TaskDocument extends Omit<ITask, '_id'>, Document {
}

const TaskSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

export default mongoose.model<TaskDocument>('Task', TaskSchema);