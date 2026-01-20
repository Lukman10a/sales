"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FinancialRecord, Investor } from "@/types/investorTypes";
import { formatCurrency } from "@/lib/investorUtils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

interface ProfitChartProps {
  financialRecords: FinancialRecord[];
  investor: Investor;
}

export function ProfitChart({ financialRecords, investor }: ProfitChartProps) {
  // Prepare chart data
  const chartData = financialRecords.map((record) => {
    const investorShare = record.netProfit * investor.percentageOwnership;
    return {
      month: new Date(record.date).toLocaleDateString("en-NG", {
        month: "short",
        year: "2-digit",
      }),
      "Your Share": investorShare,
      "Total Profit": record.netProfit,
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Profit Trend</CardTitle>
          <CardDescription>
            Monthly breakdown of total profit and your share
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#F3F4F6",
                }}
                formatter={(value: any) => formatCurrency(value)}
              />
              <Legend />
              <Bar dataKey="Your Share" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
              <Bar
                dataKey="Total Profit"
                fill="#06B6D4"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">
                Average Monthly
              </p>
              <p className="text-sm font-semibold text-foreground">
                {formatCurrency(
                  chartData.reduce((sum, d) => sum + d["Your Share"], 0) /
                    chartData.length,
                )}
              </p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">
                Highest Month
              </p>
              <p className="text-sm font-semibold text-foreground">
                {formatCurrency(
                  Math.max(...chartData.map((d) => d["Your Share"])),
                )}
              </p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">
                Total 4-Month
              </p>
              <p className="text-sm font-semibold text-foreground">
                {formatCurrency(
                  chartData.reduce((sum, d) => sum + d["Your Share"], 0),
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
