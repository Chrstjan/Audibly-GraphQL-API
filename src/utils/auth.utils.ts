import jwt from "jsonwebtoken";
import { User } from "../entities/user.entity.js";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (user: User, type: "access" | "refresh") => {
  const expTime =
    Math.floor(Date.now() / 1000) +
    +(process.env[`TOKEN_${type.toUpperCase()}_EXPIRATION_SECS`] || "3600");

  return jwt.sign(
    { exp: expTime, data: { id: user.id, role: user.role } },
    process.env[`TOKEN_${type.toUpperCase()}_KEY`] as string
  );
};

export const getUserFromToken = async (
  token?: string
): Promise<User | null> => {
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_ACCESS_KEY!) as any;
    return decoded.data;
  } catch (err) {
    console.error("Token verification error:", err);
    return null;
  }
};
