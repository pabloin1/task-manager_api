// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { UserRepository } from '../repositories/user.repository';

// Extender el tipo Request para incluir el usuario
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Interfaz para el payload del token
interface JwtPayload {
  id: string;
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Verificar el header de autorización
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'No autorizado, token no proporcionado' });
      return;
    }

    // Extraer y verificar el token
    const token = authHeader.split(' ')[1];
    
    // Usando any para evitar problemas de tipado
    const secret: any = config.JWT_SECRET;
    const decoded = jwt.verify(token, secret) as JwtPayload;

    // Buscar el usuario
    const userRepository = new UserRepository();
    const user = await userRepository.findById(decoded.id);
    if (!user) {
      res.status(401).json({ message: 'No autorizado, usuario no encontrado' });
      return;
    }

    // Convertir usuario a respuesta y añadir a la solicitud
    const userResponse = userRepository.toUserResponse(user);

    // Añadir el usuario a la solicitud
    req.user = {
      id: userResponse._id,
      email: userResponse.email,
      name: userResponse.name
    };

    next();
  } catch (error) {
    res.status(401).json({ message: 'No autorizado, token inválido' });
    return;
  }
};