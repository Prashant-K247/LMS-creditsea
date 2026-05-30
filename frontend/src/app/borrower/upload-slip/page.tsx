"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { uploadSalarySlip } from "@/services/profileService";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    try {
      setLoading(true);
      await uploadSalarySlip(file);
      toast.success("Uploaded Successfully");
      setFile(null);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message || "Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
      <div className="p-6 border-b border-slate-100">
        <h1 className="text-lg font-bold text-slate-900">Upload Salary Slip</h1>
        <p className="text-sm text-slate-500 mt-0.5">Provide official documentation for credit profile scoring analysis.</p>
      </div>

      <form onSubmit={handleUpload} className="p-6 space-y-6">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Select Statement Document
          </label>
          <div className="border border-dashed border-slate-300 rounded p-6 bg-slate-50 text-center hover:bg-slate-100/50 transition-colors relative">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              accept=".pdf,.jpg,.jpeg,.png"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              required
            />
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-900">
                {file ? file.name : "Click to browse files"}
              </p>
              <p className="text-xs text-slate-400">
                Supports PDF, JPG, JPEG, or PNG up to 5MB
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={!file || loading}
            className="bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 px-6 rounded text-sm transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            {loading ? "Uploading..." : "Upload Document"}
          </button>
        </div>
      </form>
    </div>
  );
}