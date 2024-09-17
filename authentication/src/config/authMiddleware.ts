// src/authMiddleware.ts
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { SECRET_KEY } from './handlerEnvVar';

/**
 * Genera un token JWT para un usuario dado.
 * (Útil para pruebas)
 * @param user Usuario
 * @returns Token JWT
 */
export function generateToken(user: User): string {
  // Asegurarse de que el payload sea un objeto
  const payload = { ...user };
  return jwt.sign(payload, SECRET_KEY? SECRET_KEY : 'tu_clave_secreta', { expiresIn: '1h' });
}