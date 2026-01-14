"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface MainLayoutProps {
  children: React.ReactNode;
  requireRole?: "owner" | "apprentice";
}

const MainLayout = ({ children, requireRole }: MainLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user } = useAuth();
  const { isRTL } = useLanguage();
  const sidebarWidth = sidebarCollapsed ? 80 : 280;

  return (
    <ProtectedRoute requireRole={requireRole}>
      <div className="min-h-screen bg-background">
        <Sidebar />
        <Header userRole={user?.role || "owner"} sidebarWidth={sidebarWidth} />
        <motion.main
          initial={false}
          animate={isRTL ? { marginRight: sidebarWidth } : { marginLeft: sidebarWidth }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="pt-24 pb-8 px-6 min-h-screen"
        >
          {children}
        </motion.main>
      </div>
    </ProtectedRoute>
  );
};

export default MainLayout;
