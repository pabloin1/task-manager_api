// src/config/config.ts
import dotenv from 'dotenv';

dotenv.config();

interface Config {
  PORT: string | number;
  JWT_SECRET: string;
  JWT_EXPIRATION: string;
}

const config: Config = {
  PORT:  5000,
  JWT_SECRET:  'your-secret-key',
  JWT_EXPIRATION: '1d'
};

export default config;