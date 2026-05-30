import express from "express";
import {protect} from "../middleware/authMiddleware.js";
import {authorize} from "../middleware/rbacMiddleware.js";
import {getSalesLeads, getAppliedLoans, sanctionLoan, rejectLoan, getSanctionedLoans, disburseLoan} from "../controllers/dashboardController.js";
import {UserRole} from "../types/roles.js";
import {getDisbursedLoans, recordPayment} from "../controllers/dashboardController.js";

const router =express.Router();

router.get("/sales", protect, authorize(UserRole.ADMIN, UserRole.SALES), getSalesLeads);

router.get("/sanction", protect, authorize( UserRole.ADMIN, UserRole.SANCTION), getAppliedLoans);

router.patch( "/sanction/:loanId", protect, authorize(UserRole.ADMIN, UserRole.SANCTION), sanctionLoan);

router.patch("/reject/:loanId", protect, authorize(UserRole.ADMIN, UserRole.SANCTION), rejectLoan);

router.get("/disbursement", protect, authorize(UserRole.ADMIN, UserRole.DISBURSEMENT), getSanctionedLoans);

router.patch("/disbursement/:loanId", protect, authorize(UserRole.ADMIN, UserRole.DISBURSEMENT), disburseLoan);

router.get("/collection", protect, authorize(  UserRole.ADMIN,  UserRole.COLLECTION ), getDisbursedLoans);

router.post("/collection/:loanId/payment", protect, authorize(  UserRole.ADMIN,  UserRole.COLLECTION ), recordPayment);

export default router;