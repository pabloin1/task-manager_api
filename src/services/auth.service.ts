// src/services/auth.service.ts
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';
import { IUser, IUserResponse } from '../types/user';
import config from '../config/config';

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(userData: IUser): Promise<{ user: IUserResponse; token: string }> {
    // Verificar si el usuario ya existe
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('El usuario ya existe');
    }

    // Crear nuevo usuario
    const user = await this.userRepository.create(userData);
    
    // Generar token con type casting para _id
    const token = this.generateToken((user._id as any).toString());
    
    // Convertir a IUserResponse sin contraseña
    const userResponse = this.userRepository.toUserResponse(user);

    return { user: userResponse, token };
  }

  async login(email: string, password: string): Promise<{ user: IUserResponse; token: string }> {
    // Buscar usuario
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    // Verificar contraseña
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Credenciales inválidas');
    }

    // Generar token con type casting para _id
    const token = this.generateToken((user._id as any).toString());

    // Convertir a IUserResponse sin contraseña
    const userResponse = this.userRepository.toUserResponse(user);

    return { user: userResponse, token };
  }

  private generateToken(userId: string): string {
    // Usando el any para evitar problemas de tipo con jwt.sign
    const payload: any = { id: userId };
    const secret: any = config.JWT_SECRET;
    const options: any = { expiresIn: config.JWT_EXPIRATION };
    
    return jwt.sign(payload, secret, options);
  }
}