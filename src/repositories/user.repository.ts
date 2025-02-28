// src/repositories/user.repository.ts
import User, { UserDocument } from '../models/user.model';
import { IUser, IUserResponse } from '../types/user';

export class UserRepository {
  async create(userData: IUser): Promise<UserDocument> {
    const user = new User(userData);
    return await user.save();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return await User.findOne({ email });
  }

  async findById(id: string): Promise<UserDocument | null> {
    return await User.findById(id);
  }

  // Método helper para convertir un UserDocument a IUserResponse
  toUserResponse(user: UserDocument): IUserResponse {
    return {
      _id: (user._id as any).toString(),
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }
}