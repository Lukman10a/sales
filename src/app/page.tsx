"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import {
  Package,
  TrendingUp,
  BarChart3,
  Zap,
  Shield,
  Users,
  ArrowRight,
} from "lucide-react";

export default function LandingPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const { t, language, toggleLanguage, isRTL } = useLanguage();

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-xl border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center">
              <Package className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              LUXA
            </span>
          </motion.div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors text-sm font-medium"
            >
              {language === "en" ? "العربية" : "English"}
            </button>
            <Link
              href="/auth/login"
              className="px-6 py-2 rounded-lg bg-gradient-accent text-accent-foreground hover:opacity-90 transition-opacity font-medium"
            >
              {t("Sign In")}
            </Link>
          </div>
        </div>
      </nav>

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h1
            variants={itemVariants}
            className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight"
          >
            {t("Modern Sales Management")}
            <span className="text-gradient block">{t("Made Simple")}</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            {t(
              "Streamline your inventory, track sales, and gain AI-powered insights to grow your business faster than ever before."
            )}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 justify-center flex-wrap"
          >
            <Link
              href="/auth/login"
              className="px-8 py-3 rounded-xl bg-gradient-accent text-accent-foreground hover:opacity-90 transition-all font-semibold flex items-center gap-2 group"
            >
              {t("Get Started")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#features"
              className="px-8 py-3 rounded-xl border-2 border-accent text-accent hover:bg-accent/5 transition-colors font-semibold"
            >
              {t("Learn More")}
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              {t("Powerful Features")}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t("Everything you need to manage your business efficiently")}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                icon: BarChart3,
                title: t("Real-time Analytics"),
                description: t(
                  "Track your sales, inventory, and business metrics in real-time"
                ),
              },
              {
                icon: TrendingUp,
                title: t("AI-Powered Insights"),
                description: t(
                  "Get intelligent recommendations to optimize your business"
                ),
              },
              {
                icon: Package,
                title: t("Inventory Management"),
                description: t(
                  "Keep track of stock levels and get low-stock alerts"
                ),
              },
              {
                icon: Zap,
                title: t("Fast & Responsive"),
                description: t(
                  "Lightning-fast performance for smooth experience"
                ),
              },
              {
                icon: Shield,
                title: t("Secure & Reliable"),
                description: t(
                  "Enterprise-grade security to protect your data"
                ),
              },
              {
                icon: Users,
                title: t("Team Collaboration"),
                description: t("Invite team members and manage roles easily"),
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-card/50 backdrop-blur border border-border rounded-2xl p-6 hover:bg-card/80 transition-all hover:shadow-lg group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { number: "10K+", label: t("Active Users") },
              { number: "99.9%", label: t("Uptime") },
              { number: "24/7", label: t("Support") },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <div className="text-5xl font-display font-bold text-accent mb-2">
                  {stat.number}
                </div>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-gradient-to-r from-accent to-primary rounded-3xl p-12 text-center text-accent-foreground"
        >
          <h2 className="font-display text-4xl font-bold mb-4">
            {t("Ready to Transform Your Business?")}
          </h2>
          <p className="text-lg mb-8 opacity-90">
            {t(
              "Join thousands of businesses using LUXA to manage sales and inventory efficiently."
            )}
          </p>
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white text-accent hover:bg-gray-100 transition-colors font-semibold group"
          >
            {t("Start Free Trial")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-border py-12 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-accent" />
            <span className="font-semibold text-foreground">LUXA Sales</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 LUXA Sales. {t("All rights reserved.")}
          </p>
        </div>
      </footer>
    </div>
  );
}
