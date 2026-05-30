"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const role = user?.role;

  // Helper utility to apply structural top menu highlights
  const linkClass = (href: string) => {
    const isActive = pathname === href;
    return `text-sm font-medium px-3 h-16 flex items-center border-b-2 transition-colors shrink-0 ${
      isActive
        ? "border-slate-900 text-slate-900 font-semibold"
        : "border-transparent text-slate-500 hover:text-slate-900"
    }`;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Unified Top Navigation Header */}
      <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo Branding */}
          <div className="flex items-center space-x-3 shrink-0">
            <span className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center text-white font-bold text-sm tracking-tight">
              L
            </span>
            <span className="font-bold text-slate-900 text-base tracking-tight hidden md:inline">
              LMS Operations Center
            </span>
          </div>
          
          {/* Main Operational Module Selection Routes */}
          <nav className="flex items-center space-x-1 sm:space-x-2 h-full overflow-x-auto no-scrollbar mx-4">
            {(role === "ADMIN" || role === "SALES") && (
              <Link href="/dashboard/sales" className={linkClass("/dashboard/sales")}>
                Sales Leads
              </Link>
            )}

            {(role === "ADMIN" || role === "SANCTION") && (
              <Link href="/dashboard/sanction" className={linkClass("/dashboard/sanction")}>
                Loan Sanctioning
              </Link>
            )}

            {(role === "ADMIN" || role === "DISBURSEMENT") && (
              <Link href="/dashboard/disbursement" className={linkClass("/dashboard/disbursement")}>
                Disbursements
              </Link>
            )}

            {(role === "ADMIN" || role === "COLLECTION") && (
              <Link href="/dashboard/collection" className={linkClass("/dashboard/collection")}>
                Collections
              </Link>
            )}
          </nav>

          {/* Session Termination & Profile Context */}
          <div className="flex items-center space-x-4 shrink-0">
            <div className="hidden sm:block text-right border-r border-slate-200 pr-4">
              <p className="text-xs font-semibold text-slate-800 truncate max-w-38">
                {user?.email}
              </p>
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mt-0.5">
                {role}
              </p>
            </div>
            
            <button 
              onClick={logout}
              className="text-sm text-slate-500 hover:text-rose-600 font-medium transition-colors py-1 rounded"
            >
              Sign Out
            </button>
          </div>

        </div>
      </header>

      {/* Main Page Layout Canvas */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-8">
        {children}
      </main>

    </div>
  );
}