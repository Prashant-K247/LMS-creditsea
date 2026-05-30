import express from "express";
import {createProfile} from "../controllers/profileController.js";
import {protect} from "../middleware/authMiddleware.js";
import {uploadSalarySlip} from "../controllers/profileController.js";
import {upload} from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", protect, createProfile);
router.post("/upload-salary-slip", protect, upload.single("salarySlip"), uploadSalarySlip);
export default router;