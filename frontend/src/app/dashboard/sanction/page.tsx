"use client";
import { useEffect, useState } from "react";
import { getAppliedLoans, approveLoan, rejectLoan } from "@/services/dashboardService";
import ProtectedRoute from "@/components/ProtectedRoute";
import toast from "react-hot-toast";

export default function SanctionPage() {
  const [loans, setLoans] = useState<any[]>([]);
  const [reasons, setReasons] = useState<Record<string, string>>({});
  const [processingId, setProcessingId] = useState<string | null>(null);

  const loadData = async () => {
    const data = await getAppliedLoans();
    setLoans(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      setProcessingId(id);
      await approveLoan(id);
      toast.success("Application Sanctioned Successfully");
      loadData();
    } catch {
      toast.error("Failed to approve loan");
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id: string) => {
    const reason = reasons[id];
    if (!reason?.trim()) {
      toast.error("Please explicitly declare a reason for rejection");
      return;
    }
    try {
      setProcessingId(id);
      await rejectLoan(id, reason);
      toast.success("Application Rejected");
      loadData();
    } catch {
      toast.error("Failed to execute rejection processing");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <ProtectedRoute allowedRoles={["ADMIN", "SANCTION"]}>
      <div>
        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Applied Loans</h1>
          <p className="text-sm text-slate-500 mt-0.5">Evaluate incoming profile limit parameters for sanction approvals or rejection workflows.</p>
        </div>

        <div className="space-y-4">
          {loans.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-lg p-12 text-center text-sm text-slate-400">
              No active processing requests awaiting validation.
            </div>
          ) : (
            loans.map((loan) => (
              <div key={loan._id} className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wider">Borrower Identity</span>
                    <p className="text-sm font-semibold text-slate-900">{loan.borrowerId?.email || "N/A"}</p>
                  </div>
                  <div className="sm:text-right">
                    <span className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wider">Requested Principal</span>
                    <p className="text-lg font-bold text-slate-900">₹{loan.principalAmount?.toLocaleString("en-IN")}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col md:flex-row gap-3 items-end md:items-center justify-between">
                  <div className="w-full md:max-w-md">
                    <input
                      placeholder="Type official refusal audit notice..."
                      className="w-full border border-slate-300 px-3 py-2 rounded text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-800 transition-colors"
                      value={reasons[loan._id] || ""}
                      onChange={(e) => setReasons({ ...reasons, [loan._id]: e.target.value })}
                      disabled={processingId === loan._id}
                    />
                  </div>
                  
                  <div className="flex space-x-2 shrink-0">
                    <button
                      onClick={() => handleReject(loan._id)}
                      disabled={processingId === loan._id}
                      className="bg-white border border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 text-slate-700 font-medium py-2 px-4 rounded text-sm transition-colors disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleApprove(loan._id)}
                      disabled={processingId === loan._id}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-medium py-2 px-4 rounded text-sm transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
                    >
                      Approve & Sign
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}