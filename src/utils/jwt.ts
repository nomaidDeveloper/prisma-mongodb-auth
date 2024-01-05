import { sign } from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || "JWT_SECRET"; 

function generateToken(payload: { userId: string; email: string }): string {
  return sign(payload, JWT_SECRET, { expiresIn: '1d' });
}

export { generateToken };
