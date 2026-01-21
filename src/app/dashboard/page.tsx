"use client";

import { useEffect, memo } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import StatCard from "@/components/dashboard/StatCard";
import { useData } from "@/contexts/DataContext";
import QuickActions from "@/components/dashboard/QuickActions";
import { DollarSign, ShoppingCart, Package, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Dynamically import heavy components
const SalesChart = dynamic(() => import("@/components/dashboard/SalesChart"), {
  loading: () => <div className="h-[300px] bg-card rounded-xl animate-pulse" />,
  ssr: false,
});
const RecentSales = dynamic(
  () => import("@/components/dashboard/RecentSales"),
  {
    loading: () => (
      <div className="h-[300px] bg-card rounded-xl animate-pulse" />
    ),
    ssr: false,
  },
);
const InventoryAlert = dynamic(
  () => import("@/components/dashboard/InventoryAlert"),
  {
    loading: () => (
      <div className="h-[200px] bg-card rounded-xl animate-pulse" />
    ),
    ssr: false,
  },
);
const AIInsightCard = dynamic(
  () => import("@/components/dashboard/AIInsightCard"),
  {
    loading: () => (
      <div className="h-[200px] bg-card rounded-xl animate-pulse" />
    ),
    ssr: false,
  },
);

export default function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/auth/login");
    }

    // Redirect investors to their dashboard
    if (!isLoading && isAuthenticated && user?.role === "investor") {
      router.replace("/investor-dashboard");
    }
  }, [isAuthenticated, isLoading, user, router]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  return <DashboardContent />;
}

const DashboardContent = memo(function DashboardContent() {
  const { user } = useAuth();
  const { totalItemsInStock, totalItemsSold, totalSalesAmount, lowStockItems } =
    useData();
  const { t, formatCurrency } = useLanguage();

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="mb-4 sm:mb-8">
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">
            {t("Welcome back, {name}!", {
              values: { name: user?.firstName || "" },
            })}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            {t("Here's what's happening with your business today.")}
          </p>
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard
            title={t("Today's Sales")}
            value={formatCurrency(totalSalesAmount)}
            change={12.5}
            changeLabel={t("vs yesterday")}
            icon={DollarSign}
            variant="accent"
            delay={0}
          />
          <StatCard
            title={t("Items Sold")}
            value={String(totalItemsSold)}
            change={8.2}
            changeLabel={t("vs yesterday")}
            icon={ShoppingCart}
            delay={0.1}
          />
          <StatCard
            title={t("In Stock")}
            value={String(totalItemsInStock)}
            change={-2.4}
            changeLabel={t("from last week")}
            icon={Package}
            variant="warning"
            delay={0.2}
          />
          <StatCard
            title={t("Low Stock Alerts")}
            value={String(lowStockItems)}
            change={3.1}
            changeLabel={t("need attention")}
            icon={TrendingUp}
            delay={0.3}
          />
        </div>

        {/* Charts and Sales */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2">
            <SalesChart />
          </div>
          <div>
            <RecentSales />
          </div>
        </div>

        {/* Alerts and Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <InventoryAlert />
          <AIInsightCard />
        </div>
      </div>
    </MainLayout>
  );
});
