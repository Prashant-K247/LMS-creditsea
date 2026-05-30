import api from "@/lib/axios";

export const getSalesLeads =async () => {
    const res = await api.get("/dashboard/sales");
    return res.data;
};

export const getAppliedLoans =async () => {
    const res =await api.get("/dashboard/sanction");
    return res.data;
};

export const getSanctionedLoans =async () => {
    const res = await api.get("/dashboard/disbursement");
    return res.data;
};

export const getDisbursedLoans =async () => {
    const res =await api.get("/dashboard/collection");
    return res.data;
};

export const approveLoan = async (loanId: string) => {
    const res =await api.patch(`/dashboard/sanction/${loanId}`);
    return res.data;
};

export const rejectLoan =async (loanId: string, reason: string) => {
    const res = await api.patch(`/dashboard/reject/${loanId}`,{reason});
    return res.data;
};
export const disburseLoan = async (loanId: string) => {
    const res = await api.patch(`/dashboard/disbursement/${loanId}`);
    return res.data;
};
export const recordPayment =async (loanId: string, payload:{utrNumber: string; amount: number; paymentDate: string}) => {
    const res = await api.post(`/dashboard/collection/${loanId}/payment`, payload );
    return res.data;
};