"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Bell,
  Sparkles,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";

interface SidebarProps {
  userRole?: "owner" | "apprentice";
  onRoleChange?: (role: "owner" | "apprentice") => void;
}

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Sales", href: "/sales", icon: ShoppingCart },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Notifications", href: "/notifications", icon: Bell, badge: 3 },
  { name: "AI Insights", href: "/insights", icon: Sparkles },
];

const Sidebar = ({ userRole: propUserRole, onRoleChange }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { t, isRTL } = useLanguage();

  const isSettingsActive = pathname?.startsWith("/settings");

  const userRole = user?.role || propUserRole || "owner";
  const displayName = user ? `${user.firstName} ${user.lastName}` : t("User");
  const initials = user ? `${user.firstName[0]}${user.lastName[0]}` : "U";

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "fixed top-0 h-screen bg-sidebar flex flex-col z-50",
        isRTL ? "right-0" : "left-0"
      )}
    >
      {/* Logo */}
      <div className="p-6 flex items-center justify-between border-b border-sidebar-border">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center">
                <Package className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <h1 className="font-display font-bold text-sidebar-foreground text-lg">
                  {t("StockFlow")}
                </h1>
                <p className="text-xs text-sidebar-foreground/60">
                  {t("Sales & Inventory")}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {collapsed && (
          <div className="w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center mx-auto">
            <span
              className={cn(
                "absolute top-1 w-2 h-2 bg-destructive rounded-full",
                isRTL ? "left-1" : "right-1"
              )}
            />
          </div>
        )}
      </div>

      {/* User Profile */}
      <div
        className={cn(
          "p-4 border-b border-sidebar-border",
          collapsed && "px-2"
        )}
      >
        <AnimatePresence mode="wait">
          {!collapsed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3"
            >
              <Avatar className="w-10 h-10 border-2 border-sidebar-border">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-gradient-accent text-accent-foreground font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-sidebar-foreground truncate">
                  {displayName}
                </p>
                <p className="text-xs text-sidebar-foreground/60 capitalize">
                  {userRole === "owner" ? t("Owner") : t("Admin")}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center"
            >
              <Avatar className="w-10 h-10 border-2 border-sidebar-border">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-gradient-accent text-accent-foreground font-semibold text-sm">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5 flex-shrink-0",
                  isActive && "text-sidebar-primary"
                )}
              />
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="font-medium text-sm whitespace-nowrap"
                  >
                    {t(item.name)}
                  </motion.span>
                )}
              </AnimatePresence>
              {item.badge && !collapsed && (
                <Badge className="ml-auto bg-destructive text-destructive-foreground text-xs">
                  {item.badge}
                </Badge>
              )}
              {item.badge && collapsed && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-sidebar-border space-y-2">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
            isSettingsActive
              ? "bg-sidebar-accent text-sidebar-primary"
              : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
            collapsed && "justify-center"
          )}
        >
          <Settings className="w-5 h-5" />
          {!collapsed && (
            <span className="font-medium text-sm">{t("Settings")}</span>
          )}
        </Link>
        <button
          onClick={logout}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sidebar-foreground/70 hover:bg-destructive/10 hover:text-destructive transition-all",
            collapsed && "justify-center"
          )}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && (
            <span className="font-medium text-sm">{t("Logout")}</span>
          )}
        </button>
      </div>

      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={cn(
          "absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-card border border-border rounded-full flex items-center justify-center shadow-md hover:bg-muted transition-colors",
          isRTL ? "-left-3" : "-right-3"
        )}
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3 text-muted-foreground" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-muted-foreground" />
        )}
      </button>
    </motion.aside>
  );
};

export default Sidebar;
