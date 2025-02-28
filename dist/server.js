"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config/config"));
const PORT = parseInt(config_1.default.PORT, 10);
app_1.default.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
