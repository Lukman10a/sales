export const dynamic = "force-dynamic";

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
import { insights } from "@/data/aiInsight";
import { useLanguage } from "@/contexts/LanguageContext";

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
  high: {
    label: "High Priority",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
  medium: {
    label: "Medium",
    className: "bg-warning/10 text-warning border-warning/20",
  },
  low: {
    label: "Low",
    className: "bg-muted text-muted-foreground border-border",
  },
};

const AIInsights = () => {
  const { t } = useLanguage();

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
                {t("AI Insights")}
              </h1>
              <p className="text-muted-foreground">
                {t("Smart recommendations powered by your sales data")}
              </p>
            </div>
          </div>
          <Button variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            {t("Refresh Insights")}
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
              <span className="text-sm text-muted-foreground">
                {t("High Priority")}
              </span>
            </div>
            <p className="text-3xl font-display font-bold text-foreground">
              {insights.filter((i) => i.priority === "high").length}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {t("Actions needed")}
            </p>
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
              <span className="text-sm text-muted-foreground">
                {t("Potential Gain")}
              </span>
            </div>
            <p className="text-3xl font-display font-bold text-foreground">
              ₦326k
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {t("Monthly opportunity")}
            </p>
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
              <span className="text-sm text-muted-foreground">
                {t("AI Accuracy")}
              </span>
            </div>
            <p className="text-3xl font-display font-bold text-foreground">
              94.2%
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {t("Prediction rate")}
            </p>
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
                  config.borderClass,
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
                              {t(insight.title)}
                            </h3>
                            <Badge
                              variant="outline"
                              className={
                                priorityConfig[insight.priority].className
                              }
                            >
                              {t(priorityConfig[insight.priority].label)}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">
                            {t(insight.description)}
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
                                {t(metric.label)}
                              </p>
                              <div className="flex items-center gap-1">
                                <span className="font-semibold text-foreground">
                                  {metric.value}
                                </span>
                                {metric.trend &&
                                  (metric.trend === "up" ? (
                                    <TrendingUp className="w-3 h-3 text-success" />
                                  ) : (
                                    <TrendingDown className="w-3 h-3 text-destructive" />
                                  ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right: Impact and Action */}
                    <div className="lg:w-64 flex flex-col gap-3 lg:border-l lg:pl-6 pt-4 lg:pt-0 border-t lg:border-t-0">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          {t("Impact")}
                        </p>
                        <p className="font-medium text-foreground text-sm">
                          {t(insight.impact)}
                        </p>
                      </div>
                      <Button className="bg-gradient-accent text-accent-foreground hover:opacity-90 glow-accent w-full justify-between">
                        {t(insight.action)}
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
