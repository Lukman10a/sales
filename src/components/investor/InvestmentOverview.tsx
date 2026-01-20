"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Investor, InvestorDashboardData } from "@/types/investorTypes";
import { formatCurrency, formatPercentage } from "@/lib/investorUtils";
import { DollarSign, TrendingUp, Calendar, Percent } from "lucide-react";
import { motion } from "framer-motion";

interface InvestmentOverviewProps {
  investor: Investor;
  dashboardData: InvestorDashboardData;
}

export function InvestmentOverview({
  investor,
  dashboardData,
}: InvestmentOverviewProps) {
  const statCards = [
    {
      title: "Investment Amount",
      value: formatCurrency(dashboardData.investmentAmount),
      description: "Initial capital invested",
      icon: DollarSign,
      variant: "default" as const,
      delay: 0,
    },
    {
      title: "Ownership",
      value: formatPercentage(dashboardData.percentageOwnership),
      description: `${dashboardData.percentageOwnership}% of business equity`,
      icon: Percent,
      variant: "accent" as const,
      delay: 0.1,
    },
    {
      title: "Total Profit Accrued",
      value: formatCurrency(dashboardData.totalProfitAccrued),
      description: "Cumulative profit earned",
      icon: TrendingUp,
      variant: "accent" as const,
      delay: 0.2,
    },
    {
      title: "Investment Date",
      value: new Date(dashboardData.dateInvested).toLocaleDateString("en-NG", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      description: "When you invested",
      icon: Calendar,
      variant: "default" as const,
      delay: 0.3,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: stat.delay }}
        >
          <Card
            className={
              stat.variant === "accent"
                ? "bg-gradient-accent/5 border-accent/20"
                : ""
            }
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon
                className={`w-4 h-4 ${stat.variant === "accent" ? "text-accent" : "text-muted-foreground"}`}
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
