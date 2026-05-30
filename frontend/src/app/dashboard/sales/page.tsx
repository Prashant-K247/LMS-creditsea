"use client";
import { useEffect, useState } from "react";
import { getSalesLeads } from "@/services/dashboardService";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function SalesPage() {
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await getSalesLeads();
    setLeads(data);
  };

  return (
    <ProtectedRoute allowedRoles={["ADMIN", "SALES"]}>
      <div>
        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Sales Leads</h1>
          <p className="text-sm text-slate-500 mt-0.5">Review recent customer inbound registrations and account creation steps.</p>
        </div>

        {leads.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-lg p-12 text-center text-sm text-slate-400">
            No active incoming leads available.
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-lg divide-y divide-slate-100 shadow-sm">
            {leads.map((lead) => (
              <div key={lead._id} className="p-4 flex items-center justify-between sm:grid sm:grid-cols-2 hover:bg-slate-50/50 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{lead.fullName || "Unregistered Profile"}</p>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{lead.email}</p>
                </div>
                <div className="flex justify-end items-center">
                  <span className="text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-100 px-2.5 py-0.5 rounded uppercase tracking-wide">
                    New Account
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}