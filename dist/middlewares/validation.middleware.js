"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateUser = exports.validateTask = void 0;
const validateTask = (req, res, next) => {
    const { title } = req.body;
    if (!title || title.trim() === '') {
        res.status(400).json({ message: 'El título de la tarea es requerido' });
        return;
    }
    next();
};
exports.validateTask = validateTask;
const validateUser = (req, res, next) => {
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
exports.validateUser = validateUser;
const validateLogin = (req, res, next) => {
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
exports.validateLogin = validateLogin;
