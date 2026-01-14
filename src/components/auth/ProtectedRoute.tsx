"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gradient-to-b from-background/80 to-background/95 backdrop-blur-md flex items-center justify-center z-[2000]"
          style={{ direction: isRTL ? "rtl" : "ltr" }}
        >
          <div className="text-center space-y-6">
            {/* Animated spinner */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="relative w-20 h-20 mx-auto"
            >
              {/* Outer rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent border-r-accent"
              />
              {/* Inner rotating ring (opposite direction) */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border-2 border-transparent border-b-primary"
              />
              {/* Center dot */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-accent rounded-full" />
              </div>
            </motion.div>

            {/* Loading text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <h2 className="text-2xl font-semibold text-foreground">
                {t("Loading your workspace...")}
              </h2>
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-sm text-muted-foreground"
              >
                {t("Please wait...")}
              </motion.p>
            </motion.div>

            {/* Animated progress dots */}
            <div className="flex justify-center gap-2 pt-4">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ y: [-4, 0, -4] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
                  className="w-2 h-2 bg-accent/60 rounded-full"
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
