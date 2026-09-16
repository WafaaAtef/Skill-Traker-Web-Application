import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const jwtSecret = process.env.JWT_TOKEN;

  if (!jwtSecret) {
    return res.status(500).json({
      message: "JWT secret is not configured",
    });
  }

  try {
    const verified = jwt.verify(token, jwtSecret) as {
      id: string;
      role: string;
    };

    req.user = {
      id: verified.id,
      role: verified.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};