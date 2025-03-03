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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
class AuthController {
    constructor() {
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.body;
                const result = yield this.authService.register(userData);
                // Formato simplificado: Combinar user y token en un solo objeto
                const response = Object.assign(Object.assign({}, result.user), { token: result.token });
                res.status(201).json(response);
            }
            catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message
                });
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const result = yield this.authService.login(email, password);
                // Formato simplificado: Combinar user y token en un solo objeto
                const response = Object.assign(Object.assign({}, result.user), { token: result.token });
                res.status(200).json(response);
            }
            catch (error) {
                res.status(401).json({
                    success: false,
                    message: error.message
                });
            }
        });
        this.authService = new auth_service_1.AuthService();
    }
}
exports.AuthController = AuthController;
