"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { DollarSign } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear any client-side session data
    localStorage.clear();
    sessionStorage.clear();
    
    // In a real app, this would also call an API to invalidate the server session
    // await signOut(); // Supabase logout
    
    // Show logout confirmation
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    
    // Redirect to login page after a brief delay
    const timer = setTimeout(() => {
      router.push("/auth/login");
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <DollarSign className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">Leaseflow</span>
        </div>
        <h1 className="text-xl font-semibold mb-2">Logging you out...</h1>
        <p className="text-muted-foreground">Please wait while we securely log you out.</p>
      </div>
    </div>
  );
}