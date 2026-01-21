"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Package,
  Calendar,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  salesData,
  hourlyData,
  categoryData,
  topProducts,
} from "@/data/analytics";
import { cn } from "@/lib/utils";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function Analytics() {
  const { t, formatCurrency } = useLanguage();
  const { totalSalesAmount, totalItemsSold } = useData();
  const [dateRange, setDateRange] = useState<"today" | "week" | "month">(
    "week",
  );

  const stats = [
    {
      title: t("Total Revenue"),
      value: formatCurrency(totalSalesAmount),
      change: "+12.5%",
      trend: "up" as const,
      icon: DollarSign,
      color: "text-success",
    },
    {
      title: t("Units Sold"),
      value: totalItemsSold.toString(),
      change: "+8.2%",
      trend: "up" as const,
      icon: ShoppingCart,
      color: "text-primary",
    },
    {
      title: t("Avg Order Value"),
      value: formatCurrency(totalSalesAmount / (totalItemsSold || 1)),
      change: "+3.1%",
      trend: "up" as const,
      icon: TrendingUp,
      color: "text-accent",
    },
    {
      title: t("Low Stock Items"),
      value: "5",
      change: "-2",
      trend: "down" as const,
      icon: Package,
      color: "text-warning",
    },
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              {t("Analytics")}
            </h1>
            <p className="text-muted-foreground">
              {t("Comprehensive business insights and metrics")}
            </p>
          </div>
          <div className="flex items-center gap-2 border rounded-lg p-1 bg-card">
            {(["today", "week", "month"] as const).map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  dateRange === range
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t(range.charAt(0).toUpperCase() + range.slice(1))}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl border p-6 card-elevated"
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className={cn("w-5 h-5", stat.color)} />
                  <Badge
                    className={cn(
                      stat.trend === "up"
                        ? "bg-success/10 text-success"
                        : "bg-destructive/10 text-destructive",
                    )}
                  >
                    <TrendIcon className="w-3 h-3 mr-1" />
                    {stat.change}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-display font-bold text-foreground">
                  {stat.value}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-2xl border p-6 card-elevated">
            <h3 className="font-display font-semibold text-lg text-foreground mb-4">
              {t("Sales Trend")}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="day" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card rounded-2xl border p-6 card-elevated">
            <h3 className="font-display font-semibold text-lg text-foreground mb-4">
              {t("Sales by Category")}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry: any) => entry.name}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-2xl border p-6 card-elevated">
          <h3 className="font-display font-semibold text-lg text-foreground mb-4">
            {t("Top Products")}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Bar dataKey="revenue" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </MainLayout>
  );
}
