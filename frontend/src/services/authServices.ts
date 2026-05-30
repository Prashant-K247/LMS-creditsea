import api from "../lib/axios";

export const loginUser = async (email:string, password:string)=>{
    const res = await api.post("/auth/login",{email,password});
    return res.data;
}

export const registerUser = async (data:any)=>{
    const res = await api.post("/auth/register",data);
    return res.data;
}