import { useState } from "react";
import { motion } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AreaChart,
  Area,
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
import {
  CalendarIcon,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Users,
  ShoppingCart,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const salesData = [
  { day: "Mon", sales: 450000, profit: 95000 },
  { day: "Tue", sales: 380000, profit: 78000 },
  { day: "Wed", sales: 520000, profit: 112000 },
  { day: "Thu", sales: 410000, profit: 88000 },
  { day: "Fri", sales: 680000, profit: 145000 },
  { day: "Sat", sales: 890000, profit: 198000 },
  { day: "Sun", sales: 320000, profit: 68000 },
];

const hourlyData = [
  { hour: "8AM", sales: 45000 },
  { hour: "9AM", sales: 78000 },
  { hour: "10AM", sales: 125000 },
  { hour: "11AM", sales: 98000 },
  { hour: "12PM", sales: 145000 },
  { hour: "1PM", sales: 88000 },
  { hour: "2PM", sales: 112000 },
  { hour: "3PM", sales: 165000 },
  { hour: "4PM", sales: 134000 },
  { hour: "5PM", sales: 189000 },
  { hour: "6PM", sales: 156000 },
];

const categoryData = [
  { name: "Phones", value: 45, color: "hsl(160, 60%, 45%)" },
  { name: "Accessories", value: 30, color: "hsl(230, 45%, 50%)" },
  { name: "Gadgets", value: 15, color: "hsl(38, 92%, 50%)" },
  { name: "Others", value: 10, color: "hsl(280, 60%, 55%)" },
];

const topProducts = [
  { name: "Samsung Galaxy A54", sold: 45, revenue: 8325000 },
  { name: "Wireless Earbuds Pro", sold: 89, revenue: 2225000 },
  { name: "iPhone Charger Cable", sold: 156, revenue: 702000 },
  { name: "Laptop Sleeve 15\"", sold: 34, revenue: 408000 },
  { name: "Wireless Mouse", sold: 67, revenue: 502500 },
];

const formatCurrency = (amount: number) => {
  if (amount >= 1000000) {
    return `₦${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `₦${(amount / 1000).toFixed(0)}k`;
  }
  return `₦${amount}`;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: ₦{entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Analytics = () => {
  const [userRole, setUserRole] = useState<"owner" | "apprentice">("owner");
  const [dateRange, setDateRange] = useState<"today" | "week" | "month" | "custom">("week");
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <MainLayout userRole={userRole} onRoleChange={setUserRole}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Analytics
            </h1>
            <p className="text-muted-foreground">
              Track your business performance and insights
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center border rounded-lg p-1 bg-card">
              {(["today", "week", "month"] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-md transition-colors capitalize",
                    dateRange === range
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {range}
                </button>
              ))}
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  {date ? format(date, "MMM d, yyyy") : "Pick date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl border card-elevated p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-accent/10">
                <DollarSign className="w-5 h-5 text-accent" />
              </div>
              <div className="flex items-center gap-1 text-sm font-medium text-success">
                <TrendingUp className="w-3 h-3" />
                <span>+18.2%</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
            <p className="text-3xl font-display font-bold text-foreground">₦3.65M</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl border card-elevated p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-success/10">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <div className="flex items-center gap-1 text-sm font-medium text-success">
                <TrendingUp className="w-3 h-3" />
                <span>+12.5%</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Net Profit</p>
            <p className="text-3xl font-display font-bold text-foreground">₦784k</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl border card-elevated p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <ShoppingCart className="w-5 h-5 text-primary" />
              </div>
              <div className="flex items-center gap-1 text-sm font-medium text-destructive">
                <TrendingDown className="w-3 h-3" />
                <span>-2.4%</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
            <p className="text-3xl font-display font-bold text-foreground">391</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-2xl border card-elevated p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-warning/10">
                <Package className="w-5 h-5 text-warning" />
              </div>
              <div className="flex items-center gap-1 text-sm font-medium text-success">
                <TrendingUp className="w-3 h-3" />
                <span>+5.8%</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Avg Order Value</p>
            <p className="text-3xl font-display font-bold text-foreground">₦9,340</p>
          </motion.div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Sales Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl border card-elevated p-6"
          >
            <h3 className="font-display font-semibold text-lg text-foreground mb-6">
              Weekly Performance
            </h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    tickFormatter={formatCurrency}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="sales" name="Sales" fill="hsl(230, 45%, 50%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="profit" name="Profit" fill="hsl(160, 60%, 45%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Hourly Sales Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-2xl border card-elevated p-6"
          >
            <h3 className="font-display font-semibold text-lg text-foreground mb-6">
              Hourly Sales Trend
            </h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hourlyData}>
                  <defs>
                    <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(160, 60%, 45%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(160, 60%, 45%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis
                    dataKey="hour"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    tickFormatter={formatCurrency}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    name="Sales"
                    stroke="hsl(160, 60%, 45%)"
                    strokeWidth={2}
                    fill="url(#salesGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Category Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card rounded-2xl border card-elevated p-6"
          >
            <h3 className="font-display font-semibold text-lg text-foreground mb-6">
              Sales by Category
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {categoryData.map((cat) => (
                <div key={cat.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-sm text-muted-foreground">{cat.name}</span>
                  <span className="text-sm font-medium ml-auto">{cat.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card rounded-2xl border card-elevated p-6 lg:col-span-2"
          >
            <h3 className="font-display font-semibold text-lg text-foreground mb-6">
              Top Performing Products
            </h3>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={product.name}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="font-bold text-primary text-sm">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.sold} units sold</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">
                      {formatCurrency(product.revenue)}
                    </p>
                    <p className="text-xs text-muted-foreground">revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Analytics;
