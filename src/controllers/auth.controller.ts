// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { IUser } from '../types/user';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const userData: IUser = req.body;
      const result = await this.authService.register(userData);
      
      // Formato simplificado: Combinar user y token en un solo objeto
      const response = {
        ...result.user,
        token: result.token
      };
      
      res.status(201).json(response);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const result = await this.authService.login(email, password);
      
      // Formato simplificado: Combinar user y token en un solo objeto
      const response = {
        ...result.user,
        token: result.token
      };
      
      res.status(200).json(response);
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: error.message
      });
    }
  };
}