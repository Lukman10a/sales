"use client";

import React, { useState, useEffect } from "react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const { user } = useAuth();
  const { isRTL } = useLanguage();
  const sidebarWidth = sidebarCollapsed ? 80 : 280;

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    // Initial check
    checkScreenSize();

    // Listen for resize
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <ProtectedRoute requireRole={requireRole}>
      <div className="min-h-screen bg-background">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          mobileOpen={mobileMenuOpen}
          onMobileClose={() => setMobileMenuOpen(false)}
        />
        <Header
          userRole={user?.role || "owner"}
          sidebarWidth={sidebarWidth}
          onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
        <main
          className="pt-20 pb-8 px-4 sm:px-6 lg:pt-24 min-h-screen"
          style={{
            marginLeft: isLargeScreen && !isRTL ? sidebarWidth : 0,
            marginRight: isLargeScreen && isRTL ? sidebarWidth : 0,
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
