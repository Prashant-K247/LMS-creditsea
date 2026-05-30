"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getSanctionedLoans, disburseLoan } from "@/services/dashboardService";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DisbursementPage() {
  const [loans, setLoans] = useState<any[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const loadData = async () => {
    try {
      const data = await getSanctionedLoans();
      setLoans(data);
    } catch (error) {
      toast.error("Failed to load sanctioned loans");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDisburse = async (loanId: string) => {
    try {
      setLoadingId(loanId);
      await disburseLoan(loanId);
      toast.success("Loan Disbursed Successfully");
      await loadData();
    } catch (error) {
      toast.error("Failed to disburse loan");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <ProtectedRoute allowedRoles={["ADMIN", "DISBURSEMENT"]}>
      <div>
        
        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Disbursement Processing
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Sanctioned loans awaiting fund release configurations.
          </p>
        </div>

        <div className="space-y-4">
          {loans.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-lg p-12 text-center text-sm text-slate-400">
              No sanctioned loans available for payout.
            </div>
          ) : (
            loans.map((loan) => (
              <div
                key={loan._id}
                className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wider">
                      Borrower File
                    </span>
                    <p className="text-sm font-semibold text-slate-900 truncate">
                      {loan.borrowerId?.email || "N/A"}
                    </p>
                  </div>
                  <div className="md:text-right">
                    <span className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wider">
                      Loan Lifespan
                    </span>
                    <p className="text-sm font-semibold text-slate-900">
                      {loan.tenureDays} Days
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-150 rounded p-4 grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Principal Amount
                    </span>
                    <p className="text-base font-bold text-slate-900 mt-0.5">
                      ₹{loan.principalAmount?.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Total Repayment
                    </span>
                    <p className="text-base font-bold text-slate-900 mt-0.5">
                      ₹{loan.totalRepayment?.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => handleDisburse(loan._id)}
                    disabled={loadingId === loan._id}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-medium py-2 px-5 rounded text-sm transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                  >
                    {loadingId === loan._id ? "Disbursing..." : "Disburse Loan"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}