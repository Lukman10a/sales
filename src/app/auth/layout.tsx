"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t, toggleLanguage, language, isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Language Toggle - Top Right */}
      <Button
        size="sm"
        variant="outline"
        onClick={toggleLanguage}
        className="absolute top-4 right-4 z-10"
      >
        {language === "en" ? "AR" : "EN"}
      </Button>

      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">{children}</div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-12">
        <div className="relative w-full max-w-2xl">
          <Image
            src="/login_ilustration.png"
            alt="Analytics Illustration"
            width={600}
            height={600}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </div>
  );
}
