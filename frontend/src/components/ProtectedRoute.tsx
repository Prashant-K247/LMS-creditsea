"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface Props {
  children: React.ReactNode;
  allowedRoles: string[];
}

export default function ProtectedRoute({children, allowedRoles}: Props) {
    const { user } = useAuth();

    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/login");
            return;
        }
      
        if (!allowedRoles.includes(user.role)) {
            router.replace("/dashboard");
        }
    }, [user]);

    if (!user) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    if (!allowedRoles.includes(user.role)) {
        return null;
    }
    return <>{children}</>;
}