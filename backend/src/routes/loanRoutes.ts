import express from "express";
import {applyLoan,} from "../controllers/loanController.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/apply", protect, applyLoan);

export default router;