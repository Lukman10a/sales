"use client";

import { use, useMemo } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  Edit,
  Package,
  TrendingUp,
  DollarSign,
  Calendar,
  Tag,
  AlertTriangle,
  Truck,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const statusConfig = {
  "in-stock": {
    label: "In Stock",
    className: "bg-success/10 text-success border-success/20",
    icon: Package,
  },
  "low-stock": {
    label: "Low Stock",
    className: "bg-warning/10 text-warning border-warning/20",
    icon: AlertTriangle,
  },
  "out-of-stock": {
    label: "Out of Stock",
    className: "bg-destructive/10 text-destructive border-destructive/20",
    icon: AlertTriangle,
  },
};

// Mock sales trend data for the item
const generateSalesTrend = (sold: number) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map((day, index) => ({
    day,
    sales: Math.floor(Math.random() * (sold / 3)) + Math.floor(sold / 7),
  }));
};

export default function InventoryItemDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { inventory } = useData();
  const { t, formatCurrency } = useLanguage();

  const item = useMemo(
    () => inventory.find((i) => i.id === id),
    [inventory, id],
  );

  if (!item) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {t("Item not found")}
            </h2>
            <p className="text-muted-foreground mb-6">
              {t("The item you're looking for doesn't exist")}
            </p>
            <Button onClick={() => router.push("/inventory")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("Back to Inventory")}
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  const StatusIcon = statusConfig[item.status].icon;
  const profitMargin = item.sellingPrice - item.wholesalePrice;
  const profitPercentage = ((profitMargin / item.wholesalePrice) * 100).toFixed(
    1,
  );
  const totalRevenue = item.sold * item.sellingPrice;
  const totalProfit = item.sold * profitMargin;
  const salesTrend = generateSalesTrend(item.sold);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => router.push("/inventory")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Back to Inventory")}
          </Button>
          <Button className="gap-2">
            <Edit className="w-4 h-4" />
            {t("Edit Item")}
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Image and Basic Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="aspect-square relative bg-muted rounded-xl overflow-hidden mb-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-3">
                  <div>
                    <h1 className="text-2xl font-bold text-foreground mb-2">
                      {item.name}
                    </h1>
                    <Badge
                      variant="outline"
                      className={cn(
                        "gap-2",
                        statusConfig[item.status].className,
                      )}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {t(statusConfig[item.status].label)}
                    </Badge>
                  </div>

                  <div className="pt-4 border-t space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {t("Category")}
                      </span>
                      <Badge variant="secondary">{item.category}</Badge>
                    </div>
                    {item.sku && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {t("SKU")}
                        </span>
                        <span className="text-sm font-mono font-medium">
                          {item.sku}
                        </span>
                      </div>
                    )}
                    {item.supplier && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Truck className="w-3 h-3" />
                          {t("Supplier")}
                        </span>
                        <span className="text-sm font-medium">
                          {item.supplier}
                        </span>
                      </div>
                    )}
                    {item.lastRestocked && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {t("Last Restocked")}
                        </span>
                        <span className="text-sm font-medium">
                          {new Date(item.lastRestocked).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stock Alert */}
            {item.status === "low-stock" && item.reorderPoint && (
              <Card className="border-warning">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2 text-warning">
                    <AlertTriangle className="w-4 h-4" />
                    {t("Low Stock Alert")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {t(
                      "Stock is below reorder point of {point} units. Consider restocking soon.",
                      { values: { point: item.reorderPoint } },
                    )}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Details and Analytics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pricing & Stock Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    {t("Selling Price")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-accent">
                    {formatCurrency(item.sellingPrice)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t("Cost")}: {formatCurrency(item.wholesalePrice)}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    {t("In Stock")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-foreground">
                    {item.quantity}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t("Sold")}: {item.sold} {t("units")}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    {t("Profit Margin")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-success">
                    {profitPercentage}%
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatCurrency(profitMargin)} {t("per unit")}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Revenue & Profit */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    {t("Total Revenue")}
                  </CardTitle>
                  <CardDescription>
                    {t("From {count} units sold", {
                      values: { count: item.sold },
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-accent">
                    {formatCurrency(totalRevenue)}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    {t("Total Profit")}
                  </CardTitle>
                  <CardDescription>{t("Net profit earned")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-success">
                    {formatCurrency(totalProfit)}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Sales Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  {t("7-Day Sales Trend")}
                </CardTitle>
                <CardDescription>
                  {t("Daily sales performance for this item")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesTrend}>
                      <defs>
                        <linearGradient
                          id="salesGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="hsl(160, 60%, 45%)"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="hsl(160, 60%, 45%)"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="hsl(var(--border))"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "hsl(var(--muted-foreground))",
                          fontSize: 12,
                        }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "hsl(var(--muted-foreground))",
                          fontSize: 12,
                        }}
                      />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                                <p className="text-sm font-medium text-foreground">
                                  {payload[0].payload.day}
                                </p>
                                <p className="text-lg font-bold text-accent">
                                  {payload[0].value} {t("units")}
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="sales"
                        stroke="hsl(160, 60%, 45%)"
                        strokeWidth={2}
                        fill="url(#salesGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {t("Quick Actions")}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  {t("Restock Item")}
                </Button>
                <Button variant="outline" size="sm">
                  {t("Adjust Price")}
                </Button>
                <Button variant="outline" size="sm">
                  {t("View Sales History")}
                </Button>
                <Button variant="outline" size="sm">
                  {t("Generate Report")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
