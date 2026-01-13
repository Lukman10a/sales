"use client";

import { Bell, Search, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  userRole: "owner" | "apprentice";
  sidebarWidth: number;
}

const Header = ({ userRole, sidebarWidth }: HeaderProps) => {
  return (
    <motion.header
      initial={false}
      animate={{ marginLeft: sidebarWidth }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 right-0 h-16 bg-card/80 backdrop-blur-xl border-b border-border z-40 flex items-center justify-between px-6"
      style={{ left: sidebarWidth }}
    >
      {/* Search */}
      <div className="relative w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search inventory, sales, reports..."
          className="pl-10 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-accent"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
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
            <p className="text-sm font-medium text-foreground">
              {userRole === "owner" ? "Ahmed Hassan" : "Ibrahim Musa"}
            </p>
            <Badge
              variant="secondary"
              className={
                userRole === "owner"
                  ? "bg-accent/10 text-accent text-xs"
                  : "bg-primary/10 text-primary text-xs"
              }
            >
              {userRole === "owner" ? "Owner" : "Admin"}
            </Badge>
          </div>
          <Avatar className="w-10 h-10 border-2 border-accent/30">
            <AvatarImage
              src={
                userRole === "owner"
                  ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                  : "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
              }
            />
            <AvatarFallback>
              {userRole === "owner" ? "AH" : "IM"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
