import { useState } from "react";
import { motion } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  Package,
  Clock,
  CheckCircle,
  X,
  Minus,
  ShoppingCart,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SaleItem {
  id: string;
  name: string;
  image: string;
  sellingPrice: number;
  availableQty: number;
}

interface CartItem extends SaleItem {
  quantity: number;
  actualPrice: number;
}

interface SaleRecord {
  id: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  soldBy: string;
  time: string;
  status: "completed" | "pending";
}

const availableItems: SaleItem[] = [
  {
    id: "1",
    name: "Samsung Galaxy A54",
    image:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=200&h=200&fit=crop",
    sellingPrice: 185000,
    availableQty: 8,
  },
  {
    id: "2",
    name: "iPhone 15 Pro Max Case",
    image:
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=200&h=200&fit=crop",
    sellingPrice: 4500,
    availableQty: 2,
  },
  {
    id: "3",
    name: "Wireless Earbuds Pro",
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop",
    sellingPrice: 25000,
    availableQty: 15,
  },
  {
    id: "4",
    name: 'Laptop Sleeve 15"',
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop",
    sellingPrice: 12000,
    availableQty: 22,
  },
  {
    id: "5",
    name: "Wireless Mouse",
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop",
    sellingPrice: 7500,
    availableQty: 5,
  },
];

const recentSalesData: SaleRecord[] = [
  {
    id: "1",
    items: [{ name: "Samsung Galaxy A54", quantity: 1, price: 185000 }],
    total: 185000,
    soldBy: "Ibrahim",
    time: "2 mins ago",
    status: "completed",
  },
  {
    id: "2",
    items: [
      { name: "iPhone Charger Cable", quantity: 3, price: 4500 },
      { name: "Screen Protector", quantity: 2, price: 3000 },
    ],
    total: 7500,
    soldBy: "Ibrahim",
    time: "15 mins ago",
    status: "completed",
  },
  {
    id: "3",
    items: [{ name: "Wireless Earbuds Pro", quantity: 2, price: 50000 }],
    total: 50000,
    soldBy: "Ibrahim",
    time: "32 mins ago",
    status: "pending",
  },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
};

const Sales = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);

  const filteredItems = availableItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (item: SaleItem) => {
    const existingItem = cart.find((i) => i.id === item.id);
    if (existingItem) {
      if (existingItem.quantity < item.availableQty) {
        setCart(
          cart.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        );
      }
    } else {
      setCart([
        ...cart,
        { ...item, quantity: 1, actualPrice: item.sellingPrice },
      ]);
    }
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter((i) => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart(
      cart
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            if (newQty > item.availableQty) return item;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const updatePrice = (itemId: string, price: number) => {
    setCart(
      cart.map((item) =>
        item.id === itemId ? { ...item, actualPrice: price } : item
      )
    );
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.actualPrice * item.quantity,
    0
  );

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                Record Sale
              </h1>
              <p className="text-muted-foreground">
                Select items and record transactions
              </p>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredItems.map((item, index) => {
                const inCart = cart.find((i) => i.id === item.id);
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => addToCart(item)}
                    className={cn(
                      "bg-card rounded-xl border p-3 text-left transition-all card-hover",
                      inCart && "border-accent ring-2 ring-accent/20"
                    )}
                  >
                    <div className="aspect-square rounded-lg bg-muted mb-3 overflow-hidden relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      {inCart && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs font-bold">
                          {inCart.quantity}
                        </div>
                      )}
                    </div>
                    <h3 className="font-medium text-sm text-foreground truncate mb-1">
                      {item.name}
                    </h3>
                    <p className="text-accent font-semibold text-sm">
                      {formatCurrency(item.sellingPrice)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.availableQty} available
                    </p>
                  </motion.button>
                );
              })}
            </div>

            {/* Recent Sales */}
            <div className="bg-card rounded-2xl border card-elevated p-6">
              <h3 className="font-display font-semibold text-lg text-foreground mb-4">
                Recent Sales
              </h3>
              <div className="space-y-3">
                {recentSalesData.map((sale) => (
                  <div
                    key={sale.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Package className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {sale.items
                            .map((i) => `${i.name} x${i.quantity}`)
                            .join(", ")}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{sale.time}</span>
                          <span>•</span>
                          <span>by {sale.soldBy}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">
                        {formatCurrency(sale.total)}
                      </p>
                      <Badge
                        variant="outline"
                        className={cn(
                          sale.status === "completed"
                            ? "bg-success/10 text-success border-success/20"
                            : "bg-warning/10 text-warning border-warning/20"
                        )}
                      >
                        {sale.status === "completed" ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <Clock className="w-3 h-3 mr-1" />
                        )}
                        {sale.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cart */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl border card-elevated p-6 sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-accent/10">
                  <ShoppingCart className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-foreground">
                    Current Sale
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {cart.length} {cart.length === 1 ? "item" : "items"}
                  </p>
                </div>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    Click on products to add them to the sale
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex gap-3 p-3 rounded-xl bg-muted/50"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-medium text-sm text-foreground truncate">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-6 h-6 rounded bg-muted flex items-center justify-center hover:bg-muted-foreground/20"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-6 h-6 rounded bg-muted flex items-center justify-center hover:bg-muted-foreground/20"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="mt-2">
                            <label className="text-xs text-muted-foreground">
                              Actual Price
                            </label>
                            <Input
                              type="number"
                              value={item.actualPrice}
                              onChange={(e) =>
                                updatePrice(item.id, Number(e.target.value))
                              }
                              className="h-8 text-sm mt-1"
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">
                        {formatCurrency(cartTotal)}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-display font-bold">
                      <span>Total</span>
                      <span className="text-accent">
                        {formatCurrency(cartTotal)}
                      </span>
                    </div>
                    <Button className="w-full bg-gradient-accent text-accent-foreground hover:opacity-90 glow-accent mt-4">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Complete Sale
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Sales;
