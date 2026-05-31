"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getDisbursedLoans, recordPayment } from "@/services/dashboardService";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function CollectionPage() {
  const [loans, setLoans] = useState<any[]>([]);
  const [utrStates, setUtrStates] = useState<Record<string, string>>({});
  const [amountStates, setAmountStates] = useState<Record<string, string>>({});
  const [submittingId, setSubmittingId] = useState<string | null>(null);

  const loadData = async () => {
    const data = await getDisbursedLoans();
    setLoans(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRecordPayment = async (loanId: string) => {
    const utr = utrStates[loanId];
    const amount = amountStates[loanId];

    if (!utr?.trim() || !amount?.trim()) {
      toast.error("Please insert transaction hash code and recovery amount configuration");
      return;
    }

    try {
      setSubmittingId(loanId);
      await recordPayment(loanId, {
        utrNumber: utr,
        amount: Number(amount),
        paymentDate: new Date().toISOString(),
      });
      toast.success("Payment Received and Logged");
      
      setUtrStates(prev => ({ ...prev, [loanId]: "" }));
      setAmountStates(prev => ({ ...prev, [loanId]: "" }));
      loadData();
    } catch(error) {
        console.error(error);
        toast.error("Something is Wrong. Please check Details and Try Again");
    } finally {
      setSubmittingId(null);
    } 
  };

  return (
    <ProtectedRoute allowedRoles={["ADMIN", "COLLECTION"]}>
      <div>
        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Collection Processing</h1>
          <p className="text-sm text-slate-500 mt-0.5">Track, receive, and log client loan repayments using their inbound clearing receipts.</p>
        </div>

        <div className="space-y-4">
          {loans.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-lg p-12 text-center text-sm text-slate-400">
              No outstanding balances registered.
            </div>
          ) : (
            loans.map((loan) => (
              <div key={loan._id} className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wider">Account Reference</span>
                    <p className="text-sm font-semibold text-slate-900 truncate">{loan.borrowerId?.email || "N/A"}</p>
                  </div>
                  <div className="md:text-right">
                    <span className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wider">Total Outstanding</span>
                    <p className="text-sm font-bold text-rose-600">₹{loan.outstandingBalance?.toLocaleString("en-IN")}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-end gap-3">
                  <div className="w-full sm:flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <input
                      placeholder="Inward UTR/Ref Hash"
                      className="border border-slate-300 px-3 py-2 rounded text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-800 transition-colors"
                      value={utrStates[loan._id] || ""}
                      onChange={(e) => setUtrStates({ ...utrStates, [loan._id]: e.target.value })}
                      disabled={submittingId === loan._id}
                    />
                    <input
                      type="number"
                      placeholder="Inward Value (₹)"
                      className="border border-slate-300 px-3 py-2 rounded text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-800 transition-colors"
                      value={amountStates[loan._id] || ""}
                      onChange={(e) => setAmountStates({ ...amountStates, [loan._id]: e.target.value })}
                      disabled={submittingId === loan._id}
                    />
                  </div>
                  <button
                    onClick={() => handleRecordPayment(loan._id)}
                    disabled={submittingId === loan._id}
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded text-sm transition-colors shrink-0 disabled:bg-slate-400"
                  >
                    {submittingId === loan._id ? "Recording..." : "Log Repayment"}
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