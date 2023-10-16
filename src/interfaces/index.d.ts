import { JwtPayload } from 'jsonwebtoken';

/* eslint-disable @typescript-eslint/consistent-type-definitions */
declare global {
  namespace Express {
    interface Request {
      user: JwtPayload | null;
    }
  }
}
