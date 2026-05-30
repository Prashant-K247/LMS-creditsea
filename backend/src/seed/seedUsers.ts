import dotenv from "dotenv"; 
dotenv.config();
import bcrypt from "bcrypt";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import { UserRole } from "../types/roles.js";

const seedUsers = async () => {
    try {
        await connectDB();

        await User.deleteMany({role:{$ne: UserRole.BORROWER}});

        const hashedPassword =await bcrypt.hash("Password@123", 10);

        const users = [
            {
              fullName: "Admin User",
              email: "admin@test.com",
              password: hashedPassword,
              role: UserRole.ADMIN,
            },

            {
              fullName: "Sales User",
              email: "sales@test.com",
              password: hashedPassword,
              role: UserRole.SALES,
            },

            {
              fullName: "Sanction User",
              email: "sanction@test.com",
              password: hashedPassword,
              role: UserRole.SANCTION,
            },

            {
              fullName: "Disbursement User",
              email: "disbursement@test.com",
              password: hashedPassword,
              role: UserRole.DISBURSEMENT,
            },

            {
              fullName: "Collection User",
              email: "collection@test.com",
              password: hashedPassword,
              role: UserRole.COLLECTION,
            },
        ];

        await User.insertMany(users);

        console.log( "Seeded Successfully" );

        process.exit(0);
  } catch (error) {
        console.error(error);
        process.exit(1);
  }
};

seedUsers();