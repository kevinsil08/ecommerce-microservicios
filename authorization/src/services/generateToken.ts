// src/generateToken.ts
import { generateToken } from '../config/authMiddleware';

const user = {
  id: 1,
  username: 'usuario1',
  email: 'prueba@example.net'
};

const token = generateToken(user);
console.log('Token JWT:', token);
