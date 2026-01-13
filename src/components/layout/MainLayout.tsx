"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface MainLayoutProps {
  children: React.ReactNode;
  userRole: "owner" | "apprentice";
  onRoleChange: (role: "owner" | "apprentice") => void;
}

const MainLayout = ({ children, userRole, onRoleChange }: MainLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const sidebarWidth = sidebarCollapsed ? 80 : 280;

  return (
    <div className="min-h-screen bg-background">
      <Sidebar userRole={userRole} onRoleChange={onRoleChange} />
      <Header userRole={userRole} sidebarWidth={sidebarWidth} />
      <motion.main
        initial={false}
        animate={{ marginLeft: sidebarWidth }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="pt-24 pb-8 px-6 min-h-screen"
      >
        {children}
      </motion.main>
    </div>
  );
};

export default MainLayout;
