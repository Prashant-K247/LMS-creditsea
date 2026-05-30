"use client";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { applyLoan } from "@/services/loanService";

export default function LoanPage() {
  const [amount, setAmount] = useState(100000);
  const [tenure, setTenure] = useState(180);
  const [loading, setLoading] = useState(false);

  const interest = useMemo(() => {
    return (amount * 12 * tenure) / (365 * 100);
  }, [amount, tenure]);

  const repayment = amount + interest;

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await applyLoan(amount, tenure);
      toast.success("Loan Applied Successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
      <div className="p-6 border-b border-slate-100">
        <h1 className="text-lg font-bold text-slate-900">Loan Configuration</h1>
        <p className="text-sm text-slate-500 mt-0.5">Adjust sliders to calculate your dynamic compounding interest limits.</p>
      </div>

      <form onSubmit={handleApply} className="p-6 space-y-6">
        <div className="space-y-5">
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Loan Amount
              </label>
              <span className="text-sm font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded">
                ₹{amount.toLocaleString("en-IN")}
              </span>
            </div>
            <input
              type="range"
              min={50000}
              max={500000}
              step={10000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full accent-slate-900 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span>₹50,000</span>
              <span>₹5,00,000</span>
            </div>
          </div>

          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Tenure Duration
              </label>
              <span className="text-sm font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded">
                {tenure} Days
              </span>
            </div>
            <input
              type="range"
              min={30}
              max={365}
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full accent-slate-900 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span>30 Days</span>
              <span>365 Days</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-150 rounded p-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Calculated Interest</p>
            <p className="text-base font-bold text-slate-900 mt-0.5">₹{interest.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Repayment Amount</p>
            <p className="text-base font-bold text-emerald-600 mt-0.5">₹{repayment.toFixed(2)}</p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 px-6 rounded text-sm transition-colors disabled:bg-slate-400"
          >
            {loading ? "Processing Application..." : "Apply Loan"}
          </button>
        </div>
      </form>
    </div>
  );
}