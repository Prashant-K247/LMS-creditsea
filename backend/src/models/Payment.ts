import mongoose, {Schema, Document, Types} from "mongoose";

export interface IPayment extends Document {
    loanId: Types.ObjectId;
    utrNumber: string;
    amount: number;
    paymentDate: Date;
    collectedBy: Types.ObjectId;
}

const paymentSchema = new Schema<IPayment>(
    {
        loanId: {
            type:
              Schema.Types.ObjectId,
            ref: "Loan",
            required: true,
        },

        utrNumber: {
            type: String,
            required: true,
            unique: true,
        },

        amount: {
            type: Number,
            required: true,
        },

        paymentDate: {
            type: Date,
            required: true,
        },

        collectedBy: {
            type:
              Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },{timestamps: true}
);

export default mongoose.models.Payment || mongoose.model<IPayment>("Payment", paymentSchema);