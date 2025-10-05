import jwt, { SignOptions } from "jsonwebtoken";

const SECRET_KEY: jwt.Secret = process.env.JWT_SECRET || "superclaveultrasecreta";

export interface JwtPayload {
  id: string;
  email: string;
}

export function signToken(payload: JwtPayload, expiresIn: "7d" | "1h" | "30m" = "7d"): string {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, SECRET_KEY, options);
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, SECRET_KEY) as JwtPayload;
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
}
