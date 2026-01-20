"use client";

import React from "react";
import { Bell, Search, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  userRole: "owner" | "apprentice" | "investor";
  sidebarWidth: number;
}

const Header = ({ userRole, sidebarWidth }: HeaderProps) => {
  const { t, language, toggleLanguage, isRTL } = useLanguage();
  const { user } = useAuth();

  const displayName = user ? `${user.firstName} ${user.lastName}` : "User";
  const initials = user ? `${user.firstName[0]}${user.lastName[0]}` : "U";
  const roleLabel =
    userRole === "owner"
      ? t("Owner")
      : userRole === "investor"
        ? t("Investor")
        : t("Admin");

  return (
    <motion.header
      initial={false}
      animate={false}
      className="fixed top-0 h-16 bg-card/80 backdrop-blur-xl border-b border-border z-40 flex items-center justify-between px-6"
      style={{
        left: isRTL ? 0 : sidebarWidth,
        right: isRTL ? sidebarWidth : 0,
        transition: "left 0.3s ease-in-out, right 0.3s ease-in-out",
      }}
    >
      {/* Search */}
      <div className="relative w-80">
        <Search
          className={
            isRTL
              ? "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
              : "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
          }
        />
        <Input
          placeholder={t("Search inventory, sales, reports...")}
          className={
            isRTL
              ? "pr-10 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-accent"
              : "pl-10 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-accent"
          }
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleLanguage}
          className="text-xs font-semibold"
        >
          {language === "en" ? "AR" : "EN"}
        </Button>
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
            3
          </span>
        </Button>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">{displayName}</p>
            <Badge
              variant="secondary"
              className={
                userRole === "owner"
                  ? "bg-accent/10 text-accent text-xs"
                  : userRole === "investor"
                    ? "bg-green-500/10 text-green-500 text-xs"
                    : "bg-primary/10 text-primary text-xs"
              }
            >
              {roleLabel}
            </Badge>
          </div>
          <Avatar className="w-10 h-10 border-2 border-accent/30">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="bg-gradient-accent text-accent-foreground font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </motion.header>
  );
};

export default React.memo(Header);
