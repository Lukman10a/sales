import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: LucideIcon;
  variant?: "default" | "accent" | "warning" | "destructive";
  delay?: number;
}

const StatCard = ({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  variant = "default",
  delay = 0,
}: StatCardProps) => {
  const isPositive = change >= 0;

  const variantStyles = {
    default: "bg-card",
    accent: "bg-accent/5 border-accent/20",
    warning: "bg-warning/5 border-warning/20",
    destructive: "bg-destructive/5 border-destructive/20",
  };

  const iconStyles = {
    default: "bg-primary/10 text-primary",
    accent: "bg-accent/20 text-accent",
    warning: "bg-warning/20 text-warning",
    destructive: "bg-destructive/20 text-destructive",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "stat-card p-6 rounded-2xl border card-elevated card-hover",
        variantStyles[variant]
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn("p-3 rounded-xl", iconStyles[variant])}>
          <Icon className="w-5 h-5" />
        </div>
        <div
          className={cn(
            "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full",
            isPositive
              ? "bg-success/10 text-success"
              : "bg-destructive/10 text-destructive"
          )}
        >
          {isPositive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-1">{title}</p>
      <p className="text-3xl font-display font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground mt-2">{changeLabel}</p>
    </motion.div>
  );
};

export default StatCard;
