import api from "@/lib/axios";

export const applyLoan = async (principalAmount: number,tenureDays: number) => {
    const res = await api.post("/loans/apply",{principalAmount, tenureDays});

    return res.data;
};