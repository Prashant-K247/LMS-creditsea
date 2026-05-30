import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export default function RootLayout({children}:{children:React.ReactNode}) {
  return (
   <html lang="en">
    <body suppressHydrationWarning>
     <Toaster />
     <AuthProvider>
       {children}
     </AuthProvider>
    </body>
   </html>
  );
}