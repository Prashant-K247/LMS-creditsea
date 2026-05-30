import mongoose, { Schema, Document, Types} from "mongoose";
import { LoanStatus } from "../types/loanStatus.js";

export interface ILoan extends Document {
  borrowerId: Types.ObjectId;
  principalAmount: number;
  tenureDays: number;
  interestRate: number;
  simpleInterest: number;
  totalRepayment: number;
  totalPaid: number;
  outstandingBalance: number;
  status: LoanStatus;
  rejectionReason?: string;
  sanctionedBy?: Types.ObjectId;
  disbursedBy?: Types.ObjectId;
  appliedAt?: Date;
  sanctionedAt?: Date;
  disbursedAt?: Date;
  closedAt?: Date;
}

const loanSchema = new Schema<ILoan>(
    {
        borrowerId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        principalAmount: {
            type: Number,
            required: true,
        },

        tenureDays: {
            type: Number,
            required: true,
        },

        interestRate: {
            type: Number,
            default: 12,
        },

        simpleInterest: {
            type: Number,
            required: true,
        },

        totalRepayment: {
            type: Number,
            required: true,
        },

        totalPaid: {
            type: Number,
            default: 0,
        },

        outstandingBalance: {
            type: Number,
            required: true,
        },

        status: {
            type: String,
            enum: Object.values(LoanStatus),
            default: LoanStatus.APPLIED,
        },

        rejectionReason: {
            type: String,
        },

        sanctionedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },

        disbursedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },

        appliedAt: {
            type: Date,
            default: Date.now,
        },
        sanctionedAt: Date,
        disbursedAt: Date,
        closedAt: Date,
    },{timestamps: true}
);

export default mongoose.models.Loan || mongoose.model<ILoan>("Loan", loanSchema);