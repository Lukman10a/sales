"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

export default function LandingPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const { t, language, toggleLanguage } = useLanguage();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  // Show nothing while checking auth
  if (isLoading) {
    return null;
  }

  // If authenticated, don't show landing (will redirect above)
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="h-screen bg-gradient-to-br from-blue-400 via-blue-300 to-blue-200 relative overflow-hidden flex flex-col">
      {/* Decorative sparkles */}
      <div className="absolute top-20 left-20 w-8 h-8 text-white opacity-60">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>
      <div className="absolute top-40 right-32 w-6 h-6 text-white opacity-40">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>
      <div className="absolute bottom-32 right-20 w-7 h-7 text-white opacity-50">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>
      <div className="absolute top-1/2 right-10 w-6 h-6 text-white opacity-60">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>

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
            <div className="bg-white rounded-lg px-3 py-2 font-bold text-lg text-gray-900">
              LOGO
            </div>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8 text-gray-900 font-medium text-sm">
            <a href="#" className="hover:opacity-70 transition">
              Services
            </a>
            <a href="#" className="hover:opacity-70 transition">
              Our Work
            </a>
            <a href="#" className="hover:opacity-70 transition">
              Pricing
            </a>
            <a href="#" className="hover:opacity-70 transition">
              Contact
            </a>
          </div>

          {/* CTA Button */}
          <Link
            href="/auth/login"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-semibold transition-colors text-sm"
          >
            Book a Call
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section - Centered */}
      <section className="relative flex-1 flex flex-col justify-start px-6 pt-4 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center space-y-6 mb-6"
        >
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-black leading-tight text-gray-900">
            Turn Your{" "}
            <span className="inline-block bg-blue-100 rounded-2xl px-4 py-1 mx-2 border-2 border-blue-300">
              <svg
                className="w-10 h-10 inline"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </span>
            Ads Manager Into a Money Making Machine
          </h1>

          {/* Subtitle */}
          <div className="space-y-2">
            <p className="text-base text-gray-800 font-medium">
              We are a Performance Marketing Agency Based in New York
            </p>
            <p className="text-base text-gray-800 font-medium">
              We will help you grow through Meta Ads
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/auth/login"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold transition-colors text-sm"
            >
              Grow your Business
            </Link>
            <Link
              href="/auth/login"
              className="bg-white hover:bg-gray-50 text-gray-900 px-6 py-2.5 rounded-lg font-bold border-2 border-gray-300 transition-colors text-sm"
            >
              Grow your Business
            </Link>
          </div>
        </motion.div>

        {/* Dashboard preview - wider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex-1 flex items-center justify-center px-4"
        >
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl overflow-hidden">
            {/* Dashboard header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  O
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">
                    Welcome Back, Sakura
                  </p>
                  <p className="text-xs text-gray-500">
                    Last Update: 5 Dec 2025
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-1.5 hover:bg-gray-100 rounded-lg transition">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded-lg transition">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded-lg transition">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 12h.01M15 12h.01M12 12h.01M6 12h.01M18 12h.01" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Dashboard content */}
            <div className="p-6 grid grid-cols-12 gap-6">
              {/* Left sidebar */}
              <div className="col-span-2 space-y-3">
                <div className="flex items-center gap-2 font-semibold text-gray-900 p-2 bg-blue-50 rounded-lg text-sm">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                  Overview
                </div>
                <p className="text-xs text-gray-600 px-2">Updates</p>
                <p className="text-xs text-gray-600 px-2">Payment</p>
                <p className="text-xs text-gray-600 px-2">Transaction</p>
                <p className="text-xs text-gray-600 px-2">Settings</p>
              </div>

              {/* Main content */}
              <div className="col-span-10 space-y-6">
                {/* Sales Report Overview */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900 text-sm">
                      Sales Report Overview
                    </h3>
                    <div className="flex gap-4 text-xs">
                      <button className="text-gray-500 hover:text-gray-700">
                        📊 View Customers
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        📅 Restart Date
                      </button>
                    </div>
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    {/* Sales Revenue */}
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-xs text-gray-600 mb-2">
                        Sales Revenue
                      </p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gray-900">
                          45K
                        </span>
                        <svg
                          className="w-4 h-4 text-gray-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Based on customer reports
                      </p>
                    </div>

                    {/* Today Received */}
                    <div className="bg-gray-900 rounded-xl p-4 col-span-1">
                      <p className="text-xs text-gray-400 mb-2">
                        Today Received
                      </p>
                      <p className="text-xl font-bold text-white mb-2">
                        $234,890
                      </p>
                      <p className="text-xs text-gray-400">12%</p>
                    </div>

                    {/* Sales Total */}
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-xs text-gray-600 mb-2">Sales Total</p>
                      <p className="text-sm font-bold text-gray-900">
                        23 K Tool Sales in a week
                      </p>
                      <button className="text-xs text-blue-500 font-semibold mt-1">
                        View All
                      </button>
                    </div>

                    {/* Top Product */}
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-xs text-gray-600 mb-2">Top Product</p>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">
                          4.9★
                        </span>
                      </div>
                      <p className="text-sm font-bold text-gray-900 mt-2">64</p>
                    </div>
                  </div>

                  {/* Chart and Category */}
                  <div className="grid grid-cols-3 gap-4">
                    {/* Chart */}
                    <div className="col-span-2 bg-gray-100 rounded-xl p-4 h-40 flex items-end justify-around">
                      <div className="bg-gray-300 rounded-t w-6 h-20"></div>
                      <div className="bg-blue-500 rounded-t w-6 h-32"></div>
                      <div className="bg-gray-300 rounded-t w-6 h-24"></div>
                      <div className="bg-blue-400 rounded-t w-6 h-28"></div>
                      <div className="bg-gray-300 rounded-t w-6 h-22"></div>
                      <div className="bg-blue-500 rounded-t w-6 h-26"></div>
                      <div className="bg-gray-300 rounded-t w-6 h-20"></div>
                    </div>

                    {/* Category Info */}
                    <div className="space-y-3 flex flex-col justify-end">
                      <div>
                        <div className="flex items-center gap-2 mb-2 text-xs">
                          <span className="text-gray-600">
                            ● Fashion Category
                          </span>
                          <span className="text-gray-900 font-bold">
                            Other Category
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">64</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top Market Demand */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-900 text-sm">
                      Top Market Demand
                    </h3>
                    <button className="text-sm text-gray-500 hover:text-gray-700">
                      View All
                    </button>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500"></div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm">
                        Sales Statistics
                      </p>
                      <p className="text-xs text-gray-500">February</p>
                    </div>
                    <svg
                      className="w-4 h-4 text-green-500"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
