"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BorrowerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">

      <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          
          <div className="flex items-center space-x-3">
            <span className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center text-white font-bold text-sm tracking-tight">
              L
            </span>
            <span className="font-bold text-slate-900 text-base tracking-tight hidden sm:inline">
              Loan Management System
            </span>
          </div>
          
          <nav className="flex items-center space-x-1 sm:space-x-2 h-full">
            <Link 
              href="/borrower/profile" 
              className={`text-sm font-medium px-3 h-16 flex items-center border-b-2 transition-colors ${
                pathname === "/borrower/profile" 
                  ? "border-slate-900 text-slate-900 font-semibold" 
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              Profile
            </Link>
            
            <Link 
              href="/borrower/upload-slip" 
              className={`text-sm font-medium px-3 h-16 flex items-center border-b-2 transition-colors ${
                pathname === "/borrower/upload-slip" 
                  ? "border-slate-900 text-slate-900 font-semibold" 
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              Salary Slip
            </Link>
            
            <Link 
              href="/borrower/apply-loan" 
              className={`text-sm font-medium px-3 h-16 flex items-center border-b-2 transition-colors ${
                pathname === "/borrower/apply-loan" 
                  ? "border-slate-900 text-slate-900 font-semibold" 
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              Apply Loan
            </Link>
          </nav>

          <div className="flex items-center">
            <button 
              onClick={() => {
                localStorage.clear();
                window.location.href = "/login";
              }}
              className="text-sm text-slate-500 hover:text-rose-600 font-medium transition-colors px-2 py-1 rounded"
            >
              Sign Out
            </button>
          </div>

        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}