import { Response } from "express";
import BorrowerProfile from "../models/BorrowerProfile.js";
import {AuthRequest} from "../middleware/authMiddleware.js";
import {runBRE} from "../services/breService.js";

export const createProfile = async (req: AuthRequest, res: Response)=>{
    try {
        const { fullName, pan, dob, monthlySalary, employmentMode} = req.body;
      
        const breResult =runBRE({ pan, dob: new Date(dob), monthlySalary, employmentMode});
        
        if (!breResult.passed) {
            return res.status(400).json({message:breResult.reason});
        }
      
        const profile = await BorrowerProfile.create({userId: req.user._id, fullName, pan, dob, monthlySalary, employmentMode});
        
        res.status(201).json(profile);
    } catch (error) {
        // console.error(error); 
        res.status(500).json({message:"Failed to create profile"});
  }
};

export const uploadSalarySlip = async (req: AuthRequest, res: Response)=>{
    try {
        if (!req.file) {
            return res.status(400).json({message:"file is required"});
        }

        const profile =await BorrowerProfile.findOne({userId: req.user._id});

        if (!profile) {
            return res.status(404).json({ message:"Profile not found, make profile first"});
        }

        profile.salarySlip = req.file.filename;

        await profile.save();

        res.status(200).json({message:"Salary slip uploaded successfully", file: req.file.filename});
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({message:"Upload failed", error: error instanceof Error ? error.message : "Unknown error"});
    }
};