import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import testRoutes from './routes/testRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import path from "path";
import loanRoutes from './routes/loanRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/profile", profileRoutes);
app.use("/uploads", express.static(path.join(process.cwd(),"uploads")));
app.use("/api/loans", loanRoutes);
app.use("/api/dashboard", dashboardRoutes);
export default app;