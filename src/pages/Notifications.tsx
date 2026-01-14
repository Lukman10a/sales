import { useState } from "react";
import { motion } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Check,
  CheckCheck,
  Package,
  ShoppingCart,
  AlertTriangle,
  Sparkles,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "inventory" | "sale" | "alert" | "ai";
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionable?: boolean;
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "inventory",
    title: "New Items Added",
    message:
      "Ahmed added 20 units of iPhone 15 Pro Max Cases to inventory. Please confirm receipt.",
    time: "5 mins ago",
    read: false,
    actionable: true,
  },
  {
    id: "2",
    type: "alert",
    title: "Stock Discrepancy Detected",
    message:
      "Expected 12 Wireless Mouse units but system shows 8. Please verify physical count.",
    time: "15 mins ago",
    read: false,
    actionable: true,
  },
  {
    id: "3",
    type: "sale",
    title: "Large Sale Recorded",
    message:
      "Ibrahim sold Samsung Galaxy A54 for ₦185,000. Transaction completed successfully.",
    time: "32 mins ago",
    read: false,
  },
  {
    id: "4",
    type: "ai",
    title: "Restock Recommendation",
    message:
      "USB-C Fast Chargers are selling fast. Consider restocking within 48 hours to avoid stockout.",
    time: "1 hour ago",
    read: true,
  },
  {
    id: "5",
    type: "inventory",
    title: "Low Stock Warning",
    message:
      "iPhone 15 Pro Max Case has only 2 units left. Reorder to maintain stock levels.",
    time: "2 hours ago",
    read: true,
  },
  {
    id: "6",
    type: "sale",
    title: "Daily Sales Summary",
    message:
      "Total sales for today: ₦892,400 with 47 items sold. Profit margin: 24.8%.",
    time: "3 hours ago",
    read: true,
  },
  {
    id: "7",
    type: "ai",
    title: "Price Optimization",
    message:
      "Wireless Earbuds Pro are trending. Consider a slight price increase to maximize profits.",
    time: "5 hours ago",
    read: true,
  },
];

const typeConfig = {
  inventory: {
    icon: Package,
    bgClass: "bg-primary/10",
    iconClass: "text-primary",
  },
  sale: {
    icon: ShoppingCart,
    bgClass: "bg-success/10",
    iconClass: "text-success",
  },
  alert: {
    icon: AlertTriangle,
    bgClass: "bg-destructive/10",
    iconClass: "text-destructive",
  },
  ai: {
    icon: Sparkles,
    bgClass: "bg-accent/10",
    iconClass: "text-accent",
  },
};

const Notifications = () => {
  const [notifs, setNotifs] = useState(notifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifs.filter((n) => !n.read).length;
  const filteredNotifs =
    filter === "unread" ? notifs.filter((n) => !n.read) : notifs;

  const markAsRead = (id: string) => {
    setNotifs(notifs.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifs(notifs.map((n) => ({ ...n, read: true })));
  };

  const dismissNotif = (id: string) => {
    setNotifs(notifs.filter((n) => n.id !== id));
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Notifications
            </h1>
            <p className="text-muted-foreground">
              Stay updated with your business activities
            </p>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                <CheckCheck className="w-4 h-4 mr-2" />
                Mark all as read
              </Button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="flex items-center border rounded-lg p-1 bg-card">
            <button
              onClick={() => setFilter("all")}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                filter === "all"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              All
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2",
                filter === "unread"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Unread
              {unreadCount > 0 && (
                <Badge className="bg-destructive text-destructive-foreground text-xs h-5">
                  {unreadCount}
                </Badge>
              )}
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-card rounded-2xl border card-elevated p-12 text-center"
            >
              <Bell className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                All caught up!
              </h3>
              <p className="text-muted-foreground">
                No {filter === "unread" ? "unread " : ""}notifications at the
                moment.
              </p>
            </motion.div>
          ) : (
            filteredNotifs.map((notif, index) => {
              const config = typeConfig[notif.type];
              const Icon = config.icon;
              return (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    "bg-card rounded-2xl border p-4 transition-all card-hover",
                    !notif.read && "border-l-4 border-l-accent"
                  )}
                >
                  <div className="flex gap-4">
                    <div className={cn("p-3 rounded-xl h-fit", config.bgClass)}>
                      <Icon className={cn("w-5 h-5", config.iconClass)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">
                          {notif.title}
                        </h3>
                        <button
                          onClick={() => dismissNotif(notif.id)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">
                        {notif.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {notif.time}
                        </span>
                        <div className="flex items-center gap-2">
                          {!notif.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notif.id)}
                              className="h-8"
                            >
                              <Check className="w-3 h-3 mr-1" />
                              Mark as read
                            </Button>
                          )}
                          {notif.actionable && (
                            <Button
                              size="sm"
                              className="h-8 bg-accent text-accent-foreground"
                            >
                              Take Action
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Notifications;
