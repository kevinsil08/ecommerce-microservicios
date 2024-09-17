// src/types/express.d.ts
import { JwtPayload } from './jwt';

declare namespace Express {
  export interface Request {
    user?: JwtPayload;
  }
}