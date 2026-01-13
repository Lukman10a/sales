import { motion } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  Package,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  RefreshCw,
  DollarSign,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Insight {
  id: string;
  type: "restock" | "trending" | "warning" | "opportunity" | "pricing";
  priority: "high" | "medium" | "low";
  title: string;
  description: string;
  impact: string;
  action: string;
  metrics?: { label: string; value: string; trend?: "up" | "down" }[];
}

const insights: Insight[] = [
  {
    id: "1",
    type: "restock",
    priority: "high",
    title: "Urgent: Restock iPhone Chargers",
    description: "Based on current sales velocity of 8 units/day, you'll run out of USB-C Fast Chargers in approximately 2 days. Historical data shows stockouts result in 15% customer loss.",
    impact: "Potential revenue loss: ₦96,000/day",
    action: "Order 50 units now",
    metrics: [
      { label: "Current Stock", value: "16 units" },
      { label: "Daily Sales Avg", value: "8 units", trend: "up" },
      { label: "Days Until Stockout", value: "2 days" },
    ],
  },
  {
    id: "2",
    type: "trending",
    priority: "high",
    title: "Wireless Earbuds are Trending!",
    description: "Sales of Wireless Earbuds Pro have increased by 45% this week compared to last week. This product is outperforming all other accessories.",
    impact: "Additional profit opportunity: ₦125,000/week",
    action: "Increase stock by 50%",
    metrics: [
      { label: "This Week", value: "89 sold", trend: "up" },
      { label: "Last Week", value: "61 sold" },
      { label: "Growth", value: "+45%", trend: "up" },
    ],
  },
  {
    id: "3",
    type: "warning",
    priority: "medium",
    title: "Slow Moving: Laptop Sleeves",
    description: "Laptop Sleeve 15\" has only sold 2 units in the last 30 days. Current inventory of 22 units will take approximately 11 months to sell at this rate.",
    impact: "Capital locked: ₦154,000",
    action: "Consider 20% discount",
    metrics: [
      { label: "Monthly Sales", value: "2 units", trend: "down" },
      { label: "Stock Value", value: "₦154,000" },
      { label: "Days to Clear", value: "330 days" },
    ],
  },
  {
    id: "4",
    type: "pricing",
    priority: "medium",
    title: "Price Optimization Opportunity",
    description: "Samsung Galaxy A54 is selling faster than average. Market analysis suggests you can increase the price by ₦5,000 without affecting demand.",
    impact: "Additional profit: ₦60,000/month",
    action: "Update pricing",
    metrics: [
      { label: "Current Price", value: "₦185,000" },
      { label: "Suggested Price", value: "₦190,000" },
      { label: "Profit Increase", value: "+₦5,000/unit" },
    ],
  },
  {
    id: "5",
    type: "opportunity",
    priority: "low",
    title: "New Product Suggestion",
    description: "Based on customer purchase patterns, customers buying phones often look for screen protectors. Consider adding tempered glass protectors to your inventory.",
    impact: "Estimated additional revenue: ₦45,000/week",
    action: "Add to inventory",
    metrics: [
      { label: "Related Purchases", value: "67%" },
      { label: "Avg Margin", value: "55%" },
      { label: "Est. Weekly Sales", value: "30 units" },
    ],
  },
];

const typeConfig = {
  restock: {
    icon: Package,
    bgClass: "bg-accent/10",
    iconClass: "text-accent",
    borderClass: "border-accent/30",
  },
  trending: {
    icon: TrendingUp,
    bgClass: "bg-success/10",
    iconClass: "text-success",
    borderClass: "border-success/30",
  },
  warning: {
    icon: AlertCircle,
    bgClass: "bg-warning/10",
    iconClass: "text-warning",
    borderClass: "border-warning/30",
  },
  pricing: {
    icon: DollarSign,
    bgClass: "bg-primary/10",
    iconClass: "text-primary",
    borderClass: "border-primary/30",
  },
  opportunity: {
    icon: Lightbulb,
    bgClass: "bg-chart-4/10",
    iconClass: "text-chart-4",
    borderClass: "border-chart-4/30",
  },
};

const priorityConfig = {
  high: { label: "High Priority", className: "bg-destructive/10 text-destructive border-destructive/20" },
  medium: { label: "Medium", className: "bg-warning/10 text-warning border-warning/20" },
  low: { label: "Low", className: "bg-muted text-muted-foreground border-border" },
};

const AIInsights = () => {
  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-accent">
              <Sparkles className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-1">
                AI Insights
              </h1>
              <p className="text-muted-foreground">
                Smart recommendations powered by your sales data
              </p>
            </div>
          </div>
          <Button variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh Insights
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl border card-elevated p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-destructive/10">
                <Target className="w-5 h-5 text-destructive" />
              </div>
              <span className="text-sm text-muted-foreground">High Priority</span>
            </div>
            <p className="text-3xl font-display font-bold text-foreground">
              {insights.filter((i) => i.priority === "high").length}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Actions needed</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl border card-elevated p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-success/10">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <span className="text-sm text-muted-foreground">Potential Gain</span>
            </div>
            <p className="text-3xl font-display font-bold text-foreground">
              ₦326k
            </p>
            <p className="text-sm text-muted-foreground mt-1">Monthly opportunity</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl border card-elevated p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Sparkles className="w-5 h-5 text-accent" />
              </div>
              <span className="text-sm text-muted-foreground">AI Accuracy</span>
            </div>
            <p className="text-3xl font-display font-bold text-foreground">
              94.2%
            </p>
            <p className="text-sm text-muted-foreground mt-1">Prediction rate</p>
          </motion.div>
        </div>

        {/* Insights List */}
        <div className="space-y-4">
          {insights.map((insight, index) => {
            const config = typeConfig[insight.type];
            const Icon = config.icon;
            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={cn(
                  "bg-card rounded-2xl border card-elevated overflow-hidden",
                  config.borderClass
                )}
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    {/* Left: Icon and Content */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={cn("p-3 rounded-xl", config.bgClass)}>
                          <Icon className={cn("w-5 h-5", config.iconClass)} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-2">
                            <h3 className="font-display font-semibold text-lg text-foreground">
                              {insight.title}
                            </h3>
                            <Badge
                              variant="outline"
                              className={priorityConfig[insight.priority].className}
                            >
                              {priorityConfig[insight.priority].label}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">
                            {insight.description}
                          </p>
                        </div>
                      </div>

                      {/* Metrics */}
                      {insight.metrics && (
                        <div className="flex flex-wrap gap-4 ml-16">
                          {insight.metrics.map((metric) => (
                            <div
                              key={metric.label}
                              className="bg-muted/50 rounded-lg px-4 py-2"
                            >
                              <p className="text-xs text-muted-foreground mb-1">
                                {metric.label}
                              </p>
                              <div className="flex items-center gap-1">
                                <span className="font-semibold text-foreground">
                                  {metric.value}
                                </span>
                                {metric.trend && (
                                  metric.trend === "up" ? (
                                    <TrendingUp className="w-3 h-3 text-success" />
                                  ) : (
                                    <TrendingDown className="w-3 h-3 text-destructive" />
                                  )
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right: Impact and Action */}
                    <div className="lg:w-64 flex flex-col gap-3 lg:border-l lg:pl-6 pt-4 lg:pt-0 border-t lg:border-t-0">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Impact</p>
                        <p className="font-medium text-foreground text-sm">
                          {insight.impact}
                        </p>
                      </div>
                      <Button className="bg-gradient-accent text-accent-foreground hover:opacity-90 glow-accent w-full justify-between">
                        {insight.action}
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
};

export default AIInsights;
