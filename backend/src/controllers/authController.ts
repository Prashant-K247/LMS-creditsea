import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import {generateToken} from "../utils/generateToken.js";
import {UserRole} from "../types/roles.js";


export const register = async (req: Request, res: Response) => {

    try {
        const {fullName, email, password} = req.body;

        const existingUser =
            await User.findOne({email});
            if (existingUser) {
                return res.status(400).json({message: "User already exists"});
            }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            role: UserRole.BORROWER,
        })

        const token = generateToken(
            user._id.toString(),
            user.role
        )

        res.status(201).json({token, user});
    } catch (error) {
        res.status(500).json({message:"Registration failed"});
    }
};

export const login = async (req: Request, res: Response) =>{

    try {
        const { email, password }=req.body;
        
        const user= await User.findOne({email});
        
        if (!user) {
          return res.status(400).json({message: "user not found, Signup first"});
        }
      
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
          return res.status(400).json({message: "Invalid credentials"});
        }
      
        const token = generateToken(
          user._id.toString(),
          user.role
        )
      
        res.status(200).json({token, user});
    } catch (error) {
      res.status(500).json({message: "Login failed"});
    }
};