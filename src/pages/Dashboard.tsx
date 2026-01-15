import MainLayout from "@/components/layout/MainLayout";
import StatCard from "@/components/dashboard/StatCard";
import QuickActions from "@/components/dashboard/QuickActions";
import SalesChart from "@/components/dashboard/SalesChart";
import RecentSales from "@/components/dashboard/RecentSales";
import InventoryAlert from "@/components/dashboard/InventoryAlert";
import AIInsightCard from "@/components/dashboard/AIInsightCard";
import { useAuth } from "@/contexts/AuthContext";
import { DollarSign, ShoppingCart, Package, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-muted-foreground">
            Here&apos;s what&apos;s happening with your business today.
          </p>
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Today's Sales"
            value="₦892,400"
            change={12.5}
            changeLabel="vs yesterday"
            icon={DollarSign}
            variant="accent"
            delay={0}
          />
          <StatCard
            title="Items Sold"
            value="47"
            change={8.2}
            changeLabel="vs yesterday"
            icon={ShoppingCart}
            delay={0.1}
          />
          <StatCard
            title="In Stock"
            value="342"
            change={-2.4}
            changeLabel="from last week"
            icon={Package}
            variant="warning"
            delay={0.2}
          />
          <StatCard
            title="Profit Margin"
            value="24.8%"
            change={3.1}
            changeLabel="vs last month"
            icon={TrendingUp}
            delay={0.3}
          />
        </div>

        {/* Charts and Sales */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SalesChart />
          </div>
          <div>
            <RecentSales />
          </div>
        </div>

        {/* Alerts and Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InventoryAlert />
          <AIInsightCard />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
