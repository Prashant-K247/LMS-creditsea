import { Response } from "express";
import Loan from "../models/Loan.js";
import BorrowerProfile from "../models/BorrowerProfile.js";
import { AuthRequest } from "../middleware/authMiddleware.js";
import {calculateLoan} from "../services/loanCalculator.js";

export const applyLoan = async ( req: AuthRequest, res: Response)=>{
    try {
        const {principalAmount, tenureDays,}= req.body;

        if (principalAmount <50000 || principalAmount > 500000) {
            return res.status(400).json({message:"Loan amount must be between ₹50,000 and ₹5,00,000"});
        }

        if (tenureDays < 30 || tenureDays > 365) {
            return res.status(400).json({message:"Tenure must be between 30 and 365 days",});
        }

        const profile =await BorrowerProfile.findOne({userId:req.user._id,});

        if (!profile) {
            return res.status(400).json({message:"Complete profile first",});
        }

        const calc =calculateLoan(principalAmount, tenureDays);

        const loan =await Loan.create({
            borrowerId: req.user._id,
            principalAmount,
            tenureDays,
            interestRate: calc.interestRate,
            simpleInterest: calc.simpleInterest,
            totalRepayment: calc.totalRepayment,
            outstandingBalance: calc.totalRepayment,
        });

        res.status(201).json(loan);
  } catch (error) {
        res.status(500).json({message:"Loan application failed",});
  }
};