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
import { TrendingUp, Target, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface ProfitSummaryProps {
  dashboardData: InvestorDashboardData;
  investor: Investor;
}

export function ProfitSummary({ dashboardData, investor }: ProfitSummaryProps) {
  const hasReachedBreakEven = dashboardData.breakEvenDate !== undefined;
  const daysToBreakEven = dashboardData.breakEvenDate
    ? Math.ceil(
        (new Date(dashboardData.breakEvenDate).getTime() -
          new Date().getTime()) /
          (1000 * 60 * 60 * 24),
      )
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="bg-gradient-accent/5 border-accent/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            Profit Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* ROI Percentage */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                ROI Percentage
              </span>
              <Badge
                variant="secondary"
                className="bg-accent/20 text-accent hover:bg-accent/30"
              >
                {formatPercentage(dashboardData.profitPercentage)}
              </Badge>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min(dashboardData.profitPercentage, 100)}%`,
                }}
                transition={{ duration: 1, delay: 0.6 }}
                className="bg-gradient-accent h-2 rounded-full"
              />
            </div>
          </div>

          {/* Break-even Status */}
          <div className="pt-4 border-t border-border">
            <div className="space-y-2">
              {hasReachedBreakEven ? (
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Break-even Reached!
                  </span>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Break-even Status
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Recovery in progress
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    {formatCurrency(
                      dashboardData.investmentAmount -
                        dashboardData.totalProfitAccrued,
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Still to recover
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Net Profit */}
          <div className="pt-4 border-t border-border bg-accent/5 px-3 py-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                Your Total Earnings
              </span>
              <div className="text-right">
                <div className="text-xl font-bold text-accent">
                  {formatCurrency(dashboardData.totalProfitAccrued)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {formatPercentage(dashboardData.percentageOwnership)} share
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
