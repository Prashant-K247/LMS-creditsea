import mongoose, { Schema, Document } from 'mongoose';
import { UserRole } from '../types/roles.js';

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
}

const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.BORROWER,
    },
  },{timestamps: true}
);

export default mongoose.models.User || mongoose.model<IUser>("User", userSchema);