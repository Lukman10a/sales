"use client";

import { Package } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t, toggleLanguage, language, isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>

      {/* Auth Card */}
      <div className="relative w-full max-w-md">
        <Button
          size="sm"
          variant="outline"
          onClick={toggleLanguage}
          className="absolute top-4"
          style={isRTL ? { left: 16, right: "auto" } : { right: 16, left: "auto" }}
        >
          {language === "en" ? "AR" : "EN"}
        </Button>
        <div className="bg-card/80 backdrop-blur-xl rounded-3xl shadow-lg border border-border p-8">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-accent rounded-2xl mb-4">
              <Package className="w-8 h-8 text-accent-foreground" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              {t("Welcome to LUXA")}
            </h1>
            <p className="text-muted-foreground">
              {t("Sign in to manage your business")}
            </p>
          </div>

          {/* Form Content */}
          {children}
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          © 2026 LUXA Sales. {t("All rights reserved.")}
        </p>
      </div>
    </div>
  );
}
