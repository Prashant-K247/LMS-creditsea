import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/rbacMiddleware.js";
import { UserRole } from "../types/roles.js";

const router = express.Router();

router.get("/admin", protect, authorize(UserRole.ADMIN),(req, res)=>{
        res.json({message: "Admin Access Granted"});
    }
);

router.get("/sales", protect,authorize(UserRole.ADMIN, UserRole.SALES),(req, res)=>{
        res.json({message: "Sales Access Granted",});
    }
);

export default router;