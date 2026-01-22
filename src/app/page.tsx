"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Moon, Sun, Globe, Sparkles, Package } from "lucide-react";

export default function LandingPage() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const { t, language, toggleLanguage } = useLanguage();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      if (user?.role === "investor") {
        router.replace("/investor-dashboard");
      } else {
        router.replace("/dashboard");
      }
    }
  }, [isAuthenticated, isLoading, user, router]);

  useEffect(() => {
    const saved = localStorage.getItem("luxa_theme");
    if (saved) {
      setTheme(saved as "light" | "dark");
      applyTheme(saved as "light" | "dark");
    } else {
      applyTheme("light");
    }
  }, []);

  const applyTheme = (newTheme: "light" | "dark") => {
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("luxa_theme", newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-300 to-blue-200 dark:from-blue-900 dark:via-blue-800 dark:to-blue-700 relative overflow-hidden">
      {/* Decorative sparkles */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-20 left-20 w-8 h-8 text-white"
      >
        <Sparkles className="w-full h-full" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="absolute top-40 right-32 w-6 h-6 text-white"
      >
        <Sparkles className="w-full h-full" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="absolute bottom-32 right-20 w-7 h-7 text-white"
      >
        <Sparkles className="w-full h-full" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute top-1/2 right-10 w-6 h-6 text-white"
      >
        <Sparkles className="w-full h-full" />
      </motion.div>

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-50 px-8 py-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/primestore.jpg"
              alt="PrimeStock Logo"
              width={120}
              height={40}
              className="h-10 w-auto object-contain bg-white rounded-lg px-3 py-2"
            />
          </div>

          {/* Nav links & Controls */}
          <div className="hidden md:flex items-center gap-8 text-gray-900 dark:text-white font-medium text-sm">
            <Link href="#services" className="hover:opacity-70 transition">
              {t("Services")}
            </Link>
            <Link href="#work" className="hover:opacity-70 transition">
              {t("Our Work")}
            </Link>
            <Link href="#pricing" className="hover:opacity-70 transition">
              {t("Pricing")}
            </Link>
            <Link href="#contact" className="hover:opacity-70 transition">
              {t("Contact")}
            </Link>
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg hover:bg-white/20 transition-colors text-gray-900 dark:text-white"
              title="Toggle language"
            >
              <Globe className="w-5 h-5" />
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-white/20 transition-colors text-gray-900 dark:text-white"
              title="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <Link
              href="/auth/login"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-semibold transition-colors text-sm"
            >
              {t("Book a Call")}
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative px-6 pt-8 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center space-y-6 mb-10"
        >
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-black leading-tight text-gray-900 dark:text-white">
            {t("Turn Your")}{" "}
            <span className="inline-block bg-blue-100 dark:bg-blue-800 rounded-2xl px-4 py-1 mx-2 border-2 border-blue-300 dark:border-blue-600">
              <Package className="w-10 h-10 inline" />
            </span>
            {t("Inventory Manager")}
            <br />
            {t("Into a Money Making Machine")}
          </h1>

          {/* Subtitle */}
          <div className="space-y-2">
            <p className="text-base text-gray-800 dark:text-gray-200 font-medium">
              {t("We are a Sales & Inventory Management Platform")}
            </p>
            <p className="text-base text-gray-800 dark:text-gray-200 font-medium">
              {t("We will help you track, manage and grow your business")}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/auth/login"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold transition-colors text-sm"
            >
              {t("Start Managing Now")}
            </Link>
            <Link
              href="/auth/login"
              className="bg-white hover:bg-gray-50 text-gray-900 px-6 py-2.5 rounded-lg font-bold border-2 border-gray-300 transition-colors text-sm"
            >
              {t("Learn More")}
            </Link>
          </div>
        </motion.div>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center px-4"
        >
          <div className="w-full max-w-6xl">
            <Image
              src="/luxasolution.com.png"
              alt="PrimeStock Dashboard"
              width={1200}
              height={800}
              priority
              className="w-full h-auto rounded-3xl shadow-2xl"
            />
          </div>
        </motion.div>
      </section>
    </div>
  );
}
