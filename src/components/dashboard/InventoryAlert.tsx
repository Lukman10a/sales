import { motion } from "framer-motion";
import { AlertTriangle, Package, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AlertItem {
  id: string;
  name: string;
  remaining: number;
  status: "critical" | "low" | "discrepancy";
  expectedQty?: number;
}

const alertItems: AlertItem[] = [
  {
    id: "1",
    name: "iPhone 15 Pro Max Case",
    remaining: 2,
    status: "critical",
  },
  {
    id: "2",
    name: "USB-C Fast Charger",
    remaining: 5,
    status: "low",
  },
  {
    id: "3",
    name: "Wireless Mouse",
    remaining: 8,
    status: "discrepancy",
    expectedQty: 12,
  },
  {
    id: "4",
    name: "HDMI Cable 2m",
    remaining: 3,
    status: "low",
  },
];

const statusConfig = {
  critical: {
    label: "Critical",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
  low: {
    label: "Low Stock",
    className: "bg-warning/10 text-warning border-warning/20",
  },
  discrepancy: {
    label: "Discrepancy",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
};

const InventoryAlert = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="bg-card rounded-2xl border card-elevated p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-destructive/10">
            <AlertTriangle className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg text-foreground">
              Inventory Alerts
            </h3>
            <p className="text-sm text-muted-foreground">
              {alertItems.length} items need attention
            </p>
          </div>
        </div>
        <button className="flex items-center gap-2 text-sm text-accent hover:text-accent/80 font-medium transition-colors">
          View All
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        {alertItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            className={cn(
              "flex items-center justify-between p-4 rounded-xl border",
              item.status === "discrepancy"
                ? "bg-destructive/5 border-destructive/20"
                : "bg-muted/30 border-border"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <Package className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  {item.status === "discrepancy" ? (
                    <span className="text-destructive">
                      Expected: {item.expectedQty} • Actual: {item.remaining}
                    </span>
                  ) : (
                    <span>{item.remaining} remaining</span>
                  )}
                </p>
              </div>
            </div>
            <Badge
              variant="outline"
              className={cn("font-medium", statusConfig[item.status].className)}
            >
              {statusConfig[item.status].label}
            </Badge>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default InventoryAlert;
