// src/middlewares/validation.middleware.ts
import { Request, Response, NextFunction } from 'express';

export const validateTask = (req: Request, res: Response, next: NextFunction): void => {
  const { title } = req.body;
  
  if (!title || title.trim() === '') {
    res.status(400).json({ message: 'El título de la tarea es requerido' });
    return;
  }
  
  next();
};

export const validateUser = (req: Request, res: Response, next: NextFunction): void => {
  const { name, email, password } = req.body;
  
  if (!name || name.trim() === '') {
    res.status(400).json({ message: 'El nombre es requerido' });
    return;
  }
  
  if (!email || email.trim() === '') {
    res.status(400).json({ message: 'El email es requerido' });
    return;
  }
  
  if (!password || password.length < 6) {
    res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
    return;
  }
  
  next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
  const { email, password } = req.body;
  
  if (!email || email.trim() === '') {
    res.status(400).json({ message: 'El email es requerido' });
    return;
  }
  
  if (!password || password.trim() === '') {
    res.status(400).json({ message: 'La contraseña es requerida' });
    return;
  }
  
  next();
};