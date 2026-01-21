"use client";

import { useMemo, useState } from "react";
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
import { CartItem, SaleItem } from "@/types/salesTypes";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

export default function Sales() {
  const { user } = useAuth();
  const {
    inventory: allProducts,
    decrementInventory,
    addSaleRecord,
    recentSales,
  } = useData();
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const { t, formatCurrency, isRTL } = useLanguage();

  // Convert inventory items to SaleItem format for cart - memoized
  const products: SaleItem[] = useMemo(
    () =>
      allProducts.map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image,
        sellingPrice: item.sellingPrice,
        availableQty: item.quantity,
      })),
    [allProducts],
  );

  const filteredItems = useMemo(
    () =>
      products.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [products, searchQuery],
  );

  const addToCart = (item: SaleItem) => {
    const existingItem = cart.find((i) => i.id === item.id);
    if (existingItem) {
      if (existingItem.quantity < item.availableQty) {
        setCart(
          cart.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
          ),
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
        .filter(Boolean) as CartItem[],
    );
  };

  const updatePrice = (itemId: string, price: number) => {
    setCart(
      cart.map((item) =>
        item.id === itemId ? { ...item, actualPrice: price } : item,
      ),
    );
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.actualPrice * item.quantity,
    0,
  );

  const handleCompleteSale = () => {
    if (cart.length === 0) {
      toast(t("Cart is empty"));
      return;
    }

    // Validate against current products stock
    for (const ci of cart) {
      const p = allProducts.find((p) => p.id === ci.id);
      if (!p || ci.quantity > p.quantity) {
        toast(
          t("Insufficient stock for {name}", { values: { name: ci.name } }),
        );
        return;
      }
    }

    // Decrement inventory globally
    cart.forEach((item) => {
      decrementInventory(item.id, item.quantity);
    });

    // Create and add sale record globally
    const newRecord = {
      id: String(Date.now()),
      items: cart.map((c) => ({
        name: c.name,
        quantity: c.quantity,
        price: c.actualPrice,
      })),
      total: cartTotal,
      soldBy: user ? user.firstName : "You",
      time: "just now",
      status: "completed" as const,
    };
    addSaleRecord(newRecord);

    // Clear cart and reset search
    setCart([]);
    setSearchQuery("");

    toast(t("Sale completed"), {
      description: t("Total {amount}", {
        values: { amount: formatCurrency(cartTotal) },
        fallback: `${t("Total")}: ${formatCurrency(cartTotal)}`,
      }),
    });
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                {t("Record Sale")}
              </h1>
              <p className="text-muted-foreground">
                {t("Select items and record transactions")}
              </p>
            </div>

            {/* Search */}
            <div className="relative">
              <Search
                className={
                  isRTL
                    ? "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                    : "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                }
              />
              <Input
                placeholder={t("Search products...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={isRTL ? "pr-10" : "pl-10"}
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
                      inCart && "border-accent ring-2 ring-accent/20",
                    )}
                  >
                    <div className="aspect-square rounded-lg bg-muted mb-3 overflow-hidden relative">
                      <Image
                        width={400}
                        height={400}
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
                      {item.availableQty} {t("available")}
                    </p>
                  </motion.button>
                );
              })}
            </div>

            {/* Recent Sales */}
            <div className="bg-card rounded-2xl border card-elevated p-6">
              <h3 className="font-display font-semibold text-lg text-foreground mb-4">
                {t("Recent Sales")}
              </h3>
              <div className="space-y-3">
                {recentSales.slice(0, 5).map((sale) => (
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
                          <span>
                            {t("by {name}", { values: { name: sale.soldBy } })}
                          </span>
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
                            : "bg-warning/10 text-warning border-warning/20",
                        )}
                      >
                        {sale.status === "completed" ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <Clock className="w-3 h-3 mr-1" />
                        )}
                        {t(sale.status)}
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
                    {t("Current Sale")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {cart.length} {cart.length === 1 ? t("item") : t("items")}
                  </p>
                </div>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    {t("Click on products to add them to the sale")}
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
                        <Image
                          width={64}
                          height={64}
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
                              {t("Actual Price")}
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
                      <span className="text-muted-foreground">
                        {t("Subtotal")}
                      </span>
                      <span className="font-medium">
                        {formatCurrency(cartTotal)}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-display font-bold">
                      <span>{t("Total")}</span>
                      <span className="text-accent">
                        {formatCurrency(cartTotal)}
                      </span>
                    </div>
                    <Button
                      onClick={handleCompleteSale}
                      disabled={cart.length === 0}
                      className="w-full bg-gradient-accent text-accent-foreground hover:opacity-90 glow-accent mt-4"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {t("Complete Sale")}
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
}
