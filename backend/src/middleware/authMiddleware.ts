import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        
        if ( !authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({message: "Not authorized"});
        }
      
        const token = authHeader.split(" ")[1];
      
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            userId: string;
            role: string;
        };
      
        const user = await User.findById(decoded.userId).select("-password");
      
        if (!user) {
          return res.status(401).json({message: "User not found"});
        }
        
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({message: "Invalid token"});
    }
};