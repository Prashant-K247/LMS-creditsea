"use client";
import {createContext, useContext, useEffect, useState} from "react";
import { User } from "@/types/auth";

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;

    logout: () => void;
}

const AuthContext =createContext <AuthContextType>({} as AuthContextType);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] =useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, setUser, logout}}>
                {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () =>
  useContext(AuthContext);