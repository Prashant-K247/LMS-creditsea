# Loan Management System (LMS)

Video Walkthrough - https://drive.google.com/file/d/1JNTpdxcofWnp5pkjhyR2A78xlcDtKNTw/view?usp=drive_link

A full-stack loan management application built with **Next.js** (frontend) and **Express.js** (backend), featuring role-based access control, loan application processing, and payment tracking.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [User Roles & Credentials](#user-roles--credentials)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)

---

## Features

✅ **User Authentication** - Secure JWT-based authentication
✅ **Role-Based Access Control** - Different dashboards for different roles
✅ **Loan Application** - Borrowers can apply for loans
✅ **Loan Processing Pipeline** - Sales → Sanction → Disbursement → Collection
✅ **Salary Slip Upload** - Document management with multer
✅ **Payment Tracking** - Record and track loan payments
✅ **Business Rules Engine** - Automated eligibility checks (BRE)
✅ **Responsive UI** - Tailwind CSS styled interface

---

## Project Structure

```
LMS/
├── backend/                    # Express.js API Server
│   ├── src/
│   │   ├── app.ts             # Express app configuration
│   │   ├── server.ts          # Server entry point
│   │   ├── config/
│   │   │   └── db.ts          # MongoDB connection
│   │   ├── controllers/       # Route handlers
│   │   ├── models/            # MongoDB schemas
│   │   ├── routes/            # API routes
│   │   ├── middleware/        # Custom middleware
│   │   ├── services/          # Business logic
│   │   ├── types/             # TypeScript types
│   │   ├── utils/             # Utility functions
│   │   ├── uploads/           # File storage directory
│   │   └── seed/              # Database seed scripts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example           # Environment variables template
│
├── frontend/                   # Next.js React App
│   ├── src/
│   │   ├── app/               # Next.js app router
│   │   ├── components/        # Reusable components
│   │   ├── context/           # React context (Auth)
│   │   ├── hooks/             # Custom React hooks
│   │   ├── lib/               # Utilities (axios config)
│   │   ├── services/          # API service calls
│   │   ├── types/             # TypeScript types
│   │   └── middleware.ts      # Next.js middleware
│   ├── public/
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   └── tailwind.config.js
│
└── README.md

```

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **MongoDB** v5+ (Local or MongoDB Atlas)
- **Git**

---

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd LMS
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file (see Configuration section)
cp .env.example .env

# Install all dependencies
npm install
```

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install
```

---

## Configuration

### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/lms
# or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/lms

# Server Port
PORT=5000

# JWT Secret
JWT_SECRET=your_secret_key_here_change_in_production
```

### Frontend Configuration

The frontend connects to the backend via:
- **API Base URL**: `http://localhost:5000/api`
- **File Upload URL**: `http://localhost:5000/uploads`

Edit `frontend/src/lib/axios.ts` if you need to change these URLs.

---

## Running the Application

### Start MongoDB (if running locally)

```bash
# On Windows
mongod

# On macOS/Linux
brew services start mongodb-community
```

### Start Backend Server

```bash
cd backend

# Development mode (with auto-reload)
npm run dev

# The server will run on http://localhost:5000
```

### Seed Test Users

In a new terminal, run the seeding script:

```bash
cd backend
npm run seed
```

This creates the following test users with role-based access.

### Start Frontend Server

In a new terminal:

```bash
cd frontend

# Development mode
npm run dev

# The app will run on http://localhost:3000
```

### Build for Production

```bash
# Backend
cd backend
npm run build  # If applicable

# Frontend
cd frontend
npm run build
npm run start
```

---

## User Roles & Credentials

All test users use the password: **`Password@123`**

| Role            | Email               | Name        | Permissions |
|-----------------|-------|-------------|-------------|
| **ADMIN**       | admin@test.com      | Admin User  | Full system access |
| **SALES**       | sales@test.com      | Sales User  | View applications, assign to sanction |
| **SANCTION**    | sanction@test.com   | Sanction User | Approve/Reject loan applications |
| **DISBURSEMENT**| disbursement@test.com | Disbursement User | Disburse approved loans |
| **COLLECTION**  | collection@test.com | Collection User | Record payments & collections |
| **BORROWER**    | (self-register) | - | Apply for loans, upload documents |

### Login Steps

1. Navigate to `http://localhost:3000/login`
2. Enter email and password (see credentials above)
3. You'll be redirected to your role-specific dashboard

---

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Routes

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@test.com",
  "password": "Password@123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "...",
    "email": "admin@test.com",
    "fullName": "Admin User",
    "role": "ADMIN"
  }
}
```

#### Register (Borrower)
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "borrower@test.com",
  "password": "Password@123",
  "fullName": "Borrower Name"
}
```

### Loan Routes

#### Apply for Loan
```
POST /api/loans/apply-loan
Authorization: Bearer <token>
Content-Type: application/json

{
  "principalAmount": 50000,
  "tenureDays": 365,
  "interestRate": 12
}
```

#### Get Loans
```
GET /api/loans/my-loans
Authorization: Bearer <token>
```

### Profile Routes

#### Create Borrower Profile
```
POST /api/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "fullName": "John Doe",
  "pan": "ABCDE1234F",
  "dob": "1990-01-15",
  "monthlySalary": 50000,
  "employmentMode": "SALARIED"
}
```

#### Upload Salary Slip
```
POST /api/profile/upload-salary-slip
Authorization: Bearer <token>
Content-Type: multipart/form-data

[Binary file data]
```

### Dashboard Routes

#### Get Sales Leads
```
GET /api/dashboard/sales-leads
Authorization: Bearer <token>
```

#### Sanction Loan
```
POST /api/dashboard/sanction-loan/<loanId>
Authorization: Bearer <token>
```

#### Disburse Loan
```
POST /api/dashboard/disburse-loan/<loanId>
Authorization: Bearer <token>
```

#### Record Payment
```
POST /api/dashboard/record-payment
Authorization: Bearer <token>
Content-Type: application/json

{
  "loanId": "...",
  "utrNumber": "UTR123456",
  "amount": 5000
}
```

---

## Database Schema

### Collections

#### Users
```
{
  _id: ObjectId,
  fullName: String,
  email: String (unique),
  password: String (hashed),
  role: String (ADMIN|SALES|SANCTION|DISBURSEMENT|COLLECTION|BORROWER),
  createdAt: Date,
  updatedAt: Date
}
```

#### BorrowerProfile
```
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  fullName: String,
  pan: String,
  dob: Date,
  monthlySalary: Number,
  employmentMode: String (SALARIED|SELF_EMPLOYED|UNEMPLOYED),
  salarySlip: String (filename),
  createdAt: Date,
  updatedAt: Date
}
```

#### Loans
```
{
  _id: ObjectId,
  borrowerId: ObjectId (ref: User),
  principalAmount: Number,
  tenureDays: Number,
  interestRate: Number,
  simpleInterest: Number,
  totalRepayment: Number,
  totalPaid: Number,
  outstandingBalance: Number,
  status: String (APPLIED|APPROVED|REJECTED|DISBURSED|CLOSED),
  rejectionReason: String,
  sanctionedBy: ObjectId (ref: User),
  disbursedBy: ObjectId (ref: User),
  appliedAt: Date,
  sanctionedAt: Date,
  disbursedAt: Date,
  closedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

#### Payments
```
{
  _id: ObjectId,
  loanId: ObjectId (ref: Loan),
  utrNumber: String,
  amount: Number,
  paymentDate: Date,
  collectedBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

---

## Troubleshooting

### Backend Issues

#### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGO_URI` in `.env` file
- For MongoDB Atlas, verify IP whitelist includes your machine

#### Port 5000 Already in Use
```bash
# Change PORT in .env or kill the process using port 5000
# On Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# On macOS/Linux:
lsof -i :5000
kill -9 <PID>
```

### Frontend Issues

#### Tailwind Styles Not Applied
- Ensure `globals.css` is imported in `layout.tsx`
- Clear `.next` folder: `rm -rf frontend/.next`
- Restart dev server

#### CORS Errors
- Backend CORS is configured to allow `http://localhost:3000`
- Update `backend/src/app.ts` if using different frontend URL

#### Hydration Mismatch Warning
- This can occur with browser extensions modifying the DOM
- Use `suppressHydrationWarning` on body tag (already implemented)

---

## Development Tips

### Running Both Servers in One Terminal (Optional)

```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend  
cd frontend && npm run dev

# Terminal 3 - Database (if local MongoDB)
mongod
```

### Debugging

**Backend Debugging:**
- Check server console for error logs
- Use `console.log()` for debugging
- MongoDB Atlas offers cloud monitoring

**Frontend Debugging:**
- Open browser DevTools (F12)
- Check Network tab for API calls
- Use React DevTools Chrome extension

---



