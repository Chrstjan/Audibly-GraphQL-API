import jwt from "jsonwebtoken";
import { User } from "../../entities/user.entity.js";
import dotenv from "dotenv";

dotenv.config();

/**
 * Generates a JWT token (either access or refresh) for a user.
 * @param {Object} user - The user object containing user details.
 * @param {string} type - The type of token to generate ("access" or "refresh").
 * @returns {string} - The generated JWT token.
 */
export const generateToken = (user: User, type: "access" | "refresh") => {
  const expTime =
    Math.floor(Date.now() / 1000) +
    +(process.env[`TOKEN_${type.toUpperCase()}_EXPIRATION_SECS`] || "3600");

  return jwt.sign(
    { exp: expTime, data: { id: user.id, role: user.role } },
    process.env[`TOKEN_${type.toUpperCase()}_KEY`] as string
  );
};

/**
 * Extracts the user from a JWT access token.
 * @param {string} token - String containing the JWT access token.
 * @returns {Object} - The user extracted from the JWT access token.
 */
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
