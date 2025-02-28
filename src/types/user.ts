// src/types/user.ts
export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Nueva interfaz para usuario sin contraseña
export interface IUserResponse {
  _id?: string;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}
