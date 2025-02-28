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
exports.AuthService = void 0;
// src/services/auth.service.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_repository_1 = require("../repositories/user.repository");
const config_1 = __importDefault(require("../config/config"));
class AuthService {
    constructor() {
        this.userRepository = new user_repository_1.UserRepository();
    }
    register(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verificar si el usuario ya existe
            const existingUser = yield this.userRepository.findByEmail(userData.email);
            if (existingUser) {
                throw new Error('El usuario ya existe');
            }
            // Crear nuevo usuario
            const user = yield this.userRepository.create(userData);
            // Generar token con type casting para _id
            const token = this.generateToken(user._id.toString());
            // Convertir a IUserResponse sin contraseña
            const userResponse = this.userRepository.toUserResponse(user);
            return { user: userResponse, token };
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            // Buscar usuario
            const user = yield this.userRepository.findByEmail(email);
            if (!user) {
                throw new Error('Credenciales inválidas');
            }
            // Verificar contraseña
            const isMatch = yield user.comparePassword(password);
            if (!isMatch) {
                throw new Error('Credenciales inválidas');
            }
            // Generar token con type casting para _id
            const token = this.generateToken(user._id.toString());
            // Convertir a IUserResponse sin contraseña
            const userResponse = this.userRepository.toUserResponse(user);
            return { user: userResponse, token };
        });
    }
    generateToken(userId) {
        // Usando el any para evitar problemas de tipo con jwt.sign
        const payload = { id: userId };
        const secret = config_1.default.JWT_SECRET;
        const options = { expiresIn: config_1.default.JWT_EXPIRATION };
        return jsonwebtoken_1.default.sign(payload, secret, options);
    }
}
exports.AuthService = AuthService;
