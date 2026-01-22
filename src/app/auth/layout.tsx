"use client";

import Image from "next/image";
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center p-3 sm:p-4">
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
          className="absolute top-2 sm:top-4 z-10"
          style={
            isRTL ? { left: 8, right: "auto" } : { right: 8, left: "auto" }
          }
        >
          {language === "en" ? "AR" : "EN"}
        </Button>
        <div className="bg-card/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-lg border border-border p-6 sm:p-8">
          {/* Logo & Title */}
          <div className="text-center mb-6 sm:mb-8">
            <Image
              src="/primestore.jpg"
              alt="PrimeStock Logo"
              width={80}
              height={40}
              className="h-12 sm:h-16 w-auto object-contain mx-auto mb-3 sm:mb-4"
            />
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">
              {t("Welcome to PrimeStock")}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              {t("Sign in to manage your business")}
            </p>
          </div>

          {/* Form Content */}
          {children}
        </div>

        {/* Footer */}
        <p className="text-center text-xs sm:text-sm text-muted-foreground mt-4 sm:mt-6">
          © 2026 PrimeStock. {t("All rights reserved.")}
        </p>
      </div>
    </div>
  );
}
