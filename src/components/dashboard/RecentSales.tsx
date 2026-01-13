import { motion } from "framer-motion";
import { Clock, Package, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Sale {
  id: string;
  itemName: string;
  quantity: number;
  price: number;
  time: string;
  soldBy: string;
}

const recentSales: Sale[] = [
  {
    id: "1",
    itemName: "Samsung Galaxy A54",
    quantity: 1,
    price: 185000,
    time: "2 mins ago",
    soldBy: "Ibrahim",
  },
  {
    id: "2",
    itemName: "iPhone Charger Cable",
    quantity: 3,
    price: 4500,
    time: "15 mins ago",
    soldBy: "Ibrahim",
  },
  {
    id: "3",
    itemName: "Wireless Earbuds Pro",
    quantity: 2,
    price: 25000,
    time: "32 mins ago",
    soldBy: "Ibrahim",
  },
  {
    id: "4",
    itemName: "Phone Screen Protector",
    quantity: 5,
    price: 7500,
    time: "1 hour ago",
    soldBy: "Ibrahim",
  },
  {
    id: "5",
    itemName: "Laptop Sleeve 15\"",
    quantity: 1,
    price: 12000,
    time: "2 hours ago",
    soldBy: "Ibrahim",
  },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
};

const RecentSales = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-card rounded-2xl border card-elevated p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display font-semibold text-lg text-foreground">
            Recent Sales
          </h3>
          <p className="text-sm text-muted-foreground">
            Last {recentSales.length} transactions
          </p>
        </div>
        <button className="flex items-center gap-2 text-sm text-accent hover:text-accent/80 font-medium transition-colors">
          View All
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {recentSales.map((sale, index) => (
          <motion.div
            key={sale.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">
                {sale.itemName}
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Qty: {sale.quantity}</span>
                <span>•</span>
                <span>by {sale.soldBy}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-foreground">
                {formatCurrency(sale.price)}
              </p>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {sale.time}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentSales;
