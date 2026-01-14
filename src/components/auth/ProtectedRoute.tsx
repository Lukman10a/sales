"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireRole?: "owner" | "apprentice";
}

export function ProtectedRoute({ children, requireRole }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/auth/login");
    }

    if (
      !isLoading &&
      isAuthenticated &&
      requireRole &&
      user?.role !== requireRole
    ) {
      // User doesn't have required role, redirect to dashboard
      router.replace("/");
    }
  }, [isAuthenticated, isLoading, requireRole, user, router]);

  if (!isAuthenticated && !isLoading) {
    return null;
  }

  if (requireRole && user?.role !== requireRole) {
    return null;
  }

  return (
    <>
      {children}
      {isLoading && (
        <div
          className="fixed inset-0 bg-background/70 flex items-center justify-center z-[2000]"
          style={{ direction: isRTL ? "rtl" : "ltr" }}
        >
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto mb-3" />
            <p className="text-muted-foreground">
              {t("Loading your workspace...")}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
