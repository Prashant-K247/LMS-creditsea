import api from "@/lib/axios";

export const createProfile = async (data: any) => {
    const res = await api.post("/profile", data);
    return res.data;
};

export const uploadSalarySlip = async (file: File) => {
    const formData = new FormData();

    formData.append( "salarySlip", file);

    const res =await api.post("/profile/upload-salary-slip", formData);

    return res.data;
};