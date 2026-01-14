import { QuickAction } from "@/types/types";
import { BarChart3, Package, Plus, ShoppingCart } from "lucide-react";

export const actions: QuickAction[] = [
  {
    id: "add-item",
    title: "Add New Item",
    description: "Add products to inventory",
    icon: Plus,
    variant: "accent",  
    href: "/inventory",
  },
  {
    id: "record-sale",
    title: "Record Sale",
    description: "Log a new transaction",
    icon:   ShoppingCart,
    variant: "primary",
    href: "/sales",
  },
  {
    id: "view-reports",
    title: "View Reports",
    description: "Check analytics & insights",
    icon: BarChart3,
    variant: "secondary",
    href: "/analytics",
  },
  {
    id: "stock-check",
    title: "Stock Check",
    description: "Verify inventory levels",
    icon: Package,
    variant: "secondary",
    href: "/inventory",
  },
];