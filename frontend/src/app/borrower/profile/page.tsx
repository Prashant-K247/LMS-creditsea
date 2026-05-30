"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { createProfile } from "@/services/profileService";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function ProfilePage() {
  const [form, setForm] = useState({
    fullName: "",
    pan: "",
    dob: "",
    monthlySalary: "",
    employmentMode: "SALARIED",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createProfile({ ...form, monthlySalary: Number(form.monthlySalary) });
      toast.success("Profile Saved");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute allowedRoles={["BORROWER"]}>
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
        <div className="p-6 border-b border-slate-100">
          <h1 className="text-lg font-bold text-slate-900">Personal Details</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Update your identity details and financial configuration for your borrowing limit assessment.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full border border-slate-300 px-3 py-2.5 rounded text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-800 transition-colors"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                PAN Number
              </label>
              <input
                type="text"
                placeholder="ABCDE1234F"
                className="w-full border border-slate-300 px-3 py-2.5 rounded text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-800 transition-colors uppercase"
                value={form.pan}
                onChange={(e) => setForm({ ...form, pan: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Date of Birth
              </label>
              <input
                type="date"
                className="w-full border border-slate-300 px-3 py-2.5 rounded text-sm text-slate-900 focus:outline-none focus:border-slate-800 transition-colors"
                value={form.dob}
                onChange={(e) => setForm({ ...form, dob: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Monthly Salary
              </label>
              <input
                type="number"
                placeholder="0.00"
                className="w-full border border-slate-300 px-3 py-2.5 rounded text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-800 transition-colors"
                value={form.monthlySalary}
                onChange={(e) => setForm({ ...form, monthlySalary: e.target.value })}
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Employment Mode
              </label>
              <select
                className="w-full border border-slate-300 px-3 py-2.5 rounded text-sm text-slate-900 bg-white focus:outline-none focus:border-slate-800 transition-colors"
                value={form.employmentMode}
                onChange={(e) => setForm({ ...form, employmentMode: e.target.value })}
              >
                <option value="SALARIED">Salaried</option>
                <option value="SELF_EMPLOYED">Self Employed</option>
                <option value="UNEMPLOYED">Unemployed</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 px-6 rounded text-sm transition-colors disabled:bg-slate-400"
            >
              {loading ? "Saving Profile..." : "Save Profile"}
            </button>
          </div>
        </form>
      </div>
    </ProtectedRoute>
  );
}