import { NextFunction, Response, Request } from "express";
import { AuthRequest } from "./authMiddleware.js";

export const authorize = (...allowedRoles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({message: "Not authenticated"});
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({message: "you are not permitted to perform this action"});
        }

        next();
    };
};