"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface MainLayoutProps {
  children: React.ReactNode;
  requireRole?: "owner" | "apprentice" | "investor";
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
        <main
          className="pt-24 pb-8 px-6 min-h-screen"
          style={{
            marginLeft: isRTL ? 0 : sidebarWidth,
            marginRight: isRTL ? sidebarWidth : 0,
            transition: "margin 0.3s ease-in-out",
          }}
        >
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default React.memo(MainLayout);
