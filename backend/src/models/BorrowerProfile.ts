import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IBorrowerProfile extends Document {
    userId: Types.ObjectId;

    fullName: string;
    pan: string;
    dob: Date;
    monthlySalary: number;
    employmentMode:"SALARIED" | "SELF_EMPLOYED" | "UNEMPLOYED";
    salarySlip?: string;
}

const borrowerProfileSchema =new Schema<IBorrowerProfile>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        fullName: {
            type: String,
            required: true,
        },

        pan: {
            type: String,
            required: true,
            uppercase: true,
        },

        dob: {
            type: Date,
            required: true,
        },

        monthlySalary: {
            type: Number,
            required: true,
        },

        employmentMode: {
            type: String,
            enum: [
              "SALARIED",
              "SELF_EMPLOYED",
              "UNEMPLOYED",
            ],
            required: true,
        },

        salarySlip: {
            type: String,
        },
    },{timestamps: true,}
);

export default mongoose.models.BorrowerProfile || mongoose.model<IBorrowerProfile>("BorrowerProfile", borrowerProfileSchema);