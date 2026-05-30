"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { registerUser } from "@/services/authServices";
import Link from "next/link"; 

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents page reload
    
    if (!form.fullName || !form.email || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      await registerUser(form);
      
      toast.success("Account Created");
      router.push("/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 px-4">
      <div className="bg-white border border-slate-200 p-8 rounded-lg shadow-sm w-full max-w-100">

        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Borrower Registration
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Create an account to manage your loans
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              disabled={loading}
              placeholder="John Doe"
              className="w-full border border-slate-300 px-3 py-2.5 rounded text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-800 transition-colors disabled:bg-slate-50 disabled:text-slate-500"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              disabled={loading}
              placeholder="name@company.com"
              className="w-full border border-slate-300 px-3 py-2.5 rounded text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-800 transition-colors disabled:bg-slate-50 disabled:text-slate-500"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              type="password"
              disabled={loading}
              placeholder="••••••••"
              className="w-full border border-slate-300 px-3 py-2.5 rounded text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-800 transition-colors disabled:bg-slate-50 disabled:text-slate-500"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 px-4 rounded text-sm transition-colors mt-2 disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-slate-900 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}