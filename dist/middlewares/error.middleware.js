"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (err, req, res, next) => {
    console.error('Error:', err.stack);
    // Error de sintaxis JSON
    if (err instanceof SyntaxError && 'body' in err) {
        res.status(400).json({
            success: false,
            message: 'JSON mal formado. Verifica el formato de tu solicitud.'
        });
        return;
    }
    // Error genérico
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
    });
};
exports.errorMiddleware = errorMiddleware;
