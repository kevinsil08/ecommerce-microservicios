// src/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/jwt';
import { SECRET_KEY } from './handlerEnvVar';

/**
 * Extensión de la interfaz Request para agregar la propiedad 'user'.
 */
interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

/**
 * Middleware para autenticar tokens JWT.
 * @param req Solicitud
 * @param res Respuesta
 * @param next Siguiente middleware
 */
export function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'No autorizado' });
    return;
  }

  jwt.verify(token, SECRET_KEY? SECRET_KEY : 'tu_clave_secreta', (err, decoded) => {
    if (err) {
      res.status(403).json({ error: 'Prohibido' });
      return;
    }
    req.user = decoded as JwtPayload;
    next();
  });
}

/**
 * Genera un token JWT para un usuario dado.
 * (Útil para pruebas)
 * @param user Usuario
 * @returns Token JWT
 */
export function generateToken(user: JwtPayload): string {
  return jwt.sign(user, SECRET_KEY? SECRET_KEY : 'tu_clave_secreta', { expiresIn: '1h' });
}