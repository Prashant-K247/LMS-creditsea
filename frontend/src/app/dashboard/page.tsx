"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    
    switch (user.role) {
      case "ADMIN":
      case "SALES":
        router.push("/dashboard/sales");
        break;
      case "SANCTION":
        router.push("/dashboard/sanction");
        break;
      case "DISBURSEMENT":
        router.push("/dashboard/disbursement");
        break;
      case "COLLECTION":
        router.push("/dashboard/collection");
        break;
      default:
        router.push("/login");
    }
  }, [user]);

  return null;
}