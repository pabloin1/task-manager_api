"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const user_repository_1 = require("../repositories/user.repository");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const secret = config_1.default.JWT_SECRET;
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        // Buscar el usuario
        const userRepository = new user_repository_1.UserRepository();
        const user = yield userRepository.findById(decoded.id);
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
    }
    catch (error) {
        res.status(401).json({ message: 'No autorizado, token inválido' });
        return;
    }
});
exports.authMiddleware = authMiddleware;
