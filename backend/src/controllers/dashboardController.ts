import User from "../models/User.js";
import Loan from "../models/Loan.js";
import { Request, Response } from "express";
import { UserRole } from "../types/roles.js";
import { LoanStatus } from "../types/loanStatus.js";
import { AuthRequest } from "../middleware/authMiddleware.js";
import Payment from "../models/Payment.js";

export const getSalesLeads = async (req: Request, res: Response) => {
    try {
        const borrowers =await User.find({role: UserRole.BORROWER});

        const leads = [];

        for (const borrower of borrowers) {
          const loan = await Loan.findOne({borrowerId:  borrower._id,});

          if (!loan) {
            leads.push(borrower);
          }
        }

        res.json(leads);
    } catch (error) {
        res.status(500).json({message:"Failed to fetch leads"});
    }
};

export const getAppliedLoans = async (req: Request, res: Response)=>{
    try{
        const loans =await Loan.find({status: LoanStatus.APPLIED}).populate("borrowerId", "fullName email");
        res.json(loans);
    } catch(error){
        res.status(500).json({message:"Error"});
    }
};

export const sanctionLoan =async (req: AuthRequest, res: Response)=>{
    try{
        const { loanId } = req.params;

        const loan = await Loan.findById(loanId);

        if(!loan){
           return res.status(404).json({message:"Loan not found"});
        }

        if(loan.status !=="APPLIED"){
            return res.status(400).json({message:"Invalid status"});
        }

        loan.status = LoanStatus.SANCTIONED;

        loan.sanctionedBy = req.user._id;

        loan.sanctionedAt = new Date();

        await loan.save();

        res.json({message: "Loan sanctioned", loan});

    }catch(error){
        res.status(500).json({message:"Error"});
    }
};

export const rejectLoan =async (req: AuthRequest, res: Response)=>{
    try{

        const { reason } =req.body;
        
        const loan =await Loan.findById(req.params.loanId);
      
        if(!loan){
            return res.status(404).json({ message:"Not found"});
        }
     
        loan.status = LoanStatus.REJECTED;
     
        loan.rejectionReason =reason;
     
        await loan.save();
     
        res.json({ message: "Loan rejected"});

    }catch(error){
        res.status(500).json({ message:"Error"});
    }
};

export const getSanctionedLoans =async (req: Request, res: Response)=>{
    const loans =await Loan.find({ status: LoanStatus.SANCTIONED}).populate("borrowerId", "fullName email");

    res.json(loans);
};

export const disburseLoan =async ( req: AuthRequest, res: Response)=>{
    try{
        const loan =await Loan.findById( req.params.loanId); 

        if(!loan){
         return res.status(404).json({ message:"Not found"});
        }   

        loan.status =LoanStatus.DISBURSED;  
        loan.disbursedAt =new Date();   
        loan.disbursedBy =req.user._id; 

        await loan.save();  
        res.json({message:"Loan disbursed"});

    }catch(error){
        res.status(500).json({message:"Error"});
    }
};

export const getDisbursedLoans = async ( req: Request, res: Response) => {
    try {
        const loans = await Loan.find({status: LoanStatus.DISBURSED}).populate("borrowerId", "fullName email");

        res.json(loans);
    } catch (error) {
        res.status(500).json({
            message: "Error",
        });
    }
};

export const recordPayment =async ( req: AuthRequest, res: Response)=>{
    try{
        const { utrNumber, amount, paymentDate} = req.body;

        const loanId = Array.isArray(req.params.loanId) ? req.params.loanId[0] : req.params.loanId;

        const loan = await Loan.findById(loanId);

        if (!loan) {
            return res.status(404).json({ message: "Loan not found" });
        }

        if(loan.status !== LoanStatus.DISBURSED){
            return res.status(400).json({message:"Loan not active"});
        }

        const existingUTR =await Payment.findOne({utrNumber});

        if(existingUTR){
            return res.status(400).json({message:"UTR already exists"});
        }

        if(amount <= 0){
            return res.status(400).json({message:"Amount must be positive"});
        }

        if(amount >loan.outstandingBalance){
            return res.status(400).json({ message: "Payment exceeds outstanding balance"});
        }

        await Payment.create({loanId, utrNumber, amount, paymentDate, collectedBy:  req.user._id});

        loan.totalPaid += amount;

        loan.outstandingBalance -= amount;

        if(loan.outstandingBalance <= 0){
            loan.status =
             LoanStatus.CLOSED;

            loan.closedAt =
             new Date();

            loan.outstandingBalance = 0;
        }

        await loan.save();

        res.json({message: "Payment recorded", totalPaid: loan.totalPaid, outstanding: loan.outstandingBalance, status: loan.status});

    }catch(error){
        res.status(500).json({message:"Payment failed"});
    }
};