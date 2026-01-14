"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Shield, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface RoleToggleProps {
  value: "owner" | "apprentice";
  onChange: (role: "owner" | "apprentice") => void;
}

export function RoleToggle({ value, onChange }: RoleToggleProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        {t("Login as")}
      </label>
      <div className="relative flex items-center bg-muted rounded-xl p-1">
        {/* Animated background */}
        <motion.div
          className="absolute inset-y-1 w-[calc(50%-4px)] bg-gradient-accent rounded-lg"
          animate={{
            x: value === "owner" ? 4 : "calc(100% + 4px)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />

        {/* Admin option */}
        <button
          type="button"
          onClick={() => onChange("apprentice")}
          className={cn(
            "relative flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-colors z-10",
            value === "apprentice"
              ? "text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <User className="w-4 h-4" />
          <span className="font-medium text-sm">{t("Admin")}</span>
        </button>

        {/* Owner option */}
        <button
          type="button"
          onClick={() => onChange("owner")}
          className={cn(
            "relative flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-colors z-10",
            value === "owner"
              ? "text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Shield className="w-4 h-4" />
          <span className="font-medium text-sm">{t("Owner")}</span>
        </button>
      </div>
    </div>
  );
}
