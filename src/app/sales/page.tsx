"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Plus,
  Search,
  Package,
  Clock,
  CheckCircle,
  X,
  Minus,
  ShoppingCart,
  CreditCard,
  Banknote,
  Smartphone,
  AlertTriangle,
  Percent,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CartItem, SaleItem } from "@/types/salesTypes";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { categories } from "@/data/inventory";
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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<
    "cash" | "card" | "transfer"
  >("cash");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [quickAddDialog, setQuickAddDialog] = useState<{
    open: boolean;
    item: SaleItem | null;
  }>({ open: false, item: null });
  const [quickQuantity, setQuickQuantity] = useState("1");
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
      products
        .filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        .filter(
          (item) =>
            selectedCategory === "All" || item.category === selectedCategory,
        ),
    [products, searchQuery, selectedCategory],
  );

  const openQuickAddDialog = (item: SaleItem) => {
    setQuickAddDialog({ open: true, item });
    setQuickQuantity("1");
  };

  const handleQuickAdd = () => {
    if (!quickAddDialog.item) return;
    const qty = parseInt(quickQuantity) || 1;
    const item = quickAddDialog.item;

    if (qty > item.availableQty) {
      toast(t("Insufficient stock"));
      return;
    }

    const existingItem = cart.find((i) => i.id === item.id);
    if (existingItem) {
      const newQty = existingItem.quantity + qty;
      if (newQty > item.availableQty) {
        toast(t("Insufficient stock"));
        return;
      }
      setCart(
        cart.map((i) => (i.id === item.id ? { ...i, quantity: newQty } : i)),
      );
    } else {
      setCart([
        ...cart,
        { ...item, quantity: qty, actualPrice: item.sellingPrice },
      ]);
    }

    setQuickAddDialog({ open: false, item: null });
    toast(t("Added to cart"));
  };

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

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.actualPrice * item.quantity,
    0,
  );

  const cartDiscount = (cartSubtotal * discountPercent) / 100;
  const cartTotal = cartSubtotal - cartDiscount;

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
      paymentMethod,
      discount: discountPercent,
    };
    addSaleRecord(newRecord);

    // Clear cart and reset
    setCart([]);
    setSearchQuery("");
    setDiscountPercent(0);
    setPaymentMethod("cash");

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

            {/* Category Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all",
                    selectedCategory === category
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted-foreground/10",
                  )}
                >
                  {t(category)}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredItems.map((item, index) => {
                const inCart = cart.find((i) => i.id === item.id);
                const isLowStock = item.availableQty <= 5;
                const isOutOfStock = item.availableQty === 0;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => openQuickAddDialog(item)}
                    disabled={isOutOfStock}
                    className={cn(
                      "bg-card rounded-xl border p-3 text-left transition-all card-hover relative",
                      inCart && "border-accent ring-2 ring-accent/20",
                      isOutOfStock && "opacity-50 cursor-not-allowed",
                    )}
                  >
                    {isLowStock && !isOutOfStock && (
                      <div className="absolute top-2 left-2 z-10">
                        <Badge
                          variant="outline"
                          className="bg-warning/10 text-warning border-warning/20 text-xs"
                        >
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          {t("Low")}
                        </Badge>
                      </div>
                    )}
                    {isOutOfStock && (
                      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
                        <Badge
                          variant="outline"
                          className="bg-destructive/10 text-destructive border-destructive/20"
                        >
                          {t("Out of Stock")}
                        </Badge>
                      </div>
                    )}
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
                    <p
                      className={cn(
                        "text-xs",
                        isLowStock
                          ? "text-warning font-medium"
                          : "text-muted-foreground",
                      )}
                    >
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
                        {formatCurrency(cartSubtotal)}
                      </span>
                    </div>

                    {/* Discount Input */}
                    <div className="space-y-2">
                      <Label className="text-xs flex items-center gap-2">
                        <Percent className="w-3 h-3" />
                        {t("Discount (%)")}
                      </Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={discountPercent}
                        onChange={(e) =>
                          setDiscountPercent(
                            Math.min(
                              100,
                              Math.max(0, Number(e.target.value) || 0),
                            ),
                          )
                        }
                        className="h-8 text-sm"
                        placeholder="0"
                      />
                    </div>

                    {discountPercent > 0 && (
                      <div className="flex justify-between text-sm text-success">
                        <span>{t("Discount")}</span>
                        <span>-{formatCurrency(cartDiscount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-lg font-display font-bold">
                      <span>{t("Total")}</span>
                      <span className="text-accent">
                        {formatCurrency(cartTotal)}
                      </span>
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-2">
                      <Label className="text-xs">{t("Payment Method")}</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={() => setPaymentMethod("cash")}
                          className={cn(
                            "p-2 rounded-lg border-2 transition-all flex flex-col items-center gap-1",
                            paymentMethod === "cash"
                              ? "border-accent bg-accent/10"
                              : "border-border hover:border-accent/50",
                          )}
                        >
                          <Banknote className="w-4 h-4" />
                          <span className="text-xs font-medium">
                            {t("Cash")}
                          </span>
                        </button>
                        <button
                          onClick={() => setPaymentMethod("card")}
                          className={cn(
                            "p-2 rounded-lg border-2 transition-all flex flex-col items-center gap-1",
                            paymentMethod === "card"
                              ? "border-accent bg-accent/10"
                              : "border-border hover:border-accent/50",
                          )}
                        >
                          <CreditCard className="w-4 h-4" />
                          <span className="text-xs font-medium">
                            {t("Card")}
                          </span>
                        </button>
                        <button
                          onClick={() => setPaymentMethod("transfer")}
                          className={cn(
                            "p-2 rounded-lg border-2 transition-all flex flex-col items-center gap-1",
                            paymentMethod === "transfer"
                              ? "border-accent bg-accent/10"
                              : "border-border hover:border-accent/50",
                          )}
                        >
                          <Smartphone className="w-4 h-4" />
                          <span className="text-xs font-medium">
                            {t("Transfer")}
                          </span>
                        </button>
                      </div>
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

      {/* Quick Add Dialog */}
      <Dialog
        open={quickAddDialog.open}
        onOpenChange={(open) =>
          !open && setQuickAddDialog({ open: false, item: null })
        }
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("Add to Cart")}</DialogTitle>
            <DialogDescription>
              {quickAddDialog.item && (
                <span className="font-medium text-foreground">
                  {quickAddDialog.item.name} -{" "}
                  {formatCurrency(quickAddDialog.item.sellingPrice)}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">{t("Quantity")}</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                max={quickAddDialog.item?.availableQty || 1}
                value={quickQuantity}
                onChange={(e) => setQuickQuantity(e.target.value)}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleQuickAdd();
                  }
                }}
              />
              <p className="text-xs text-muted-foreground">
                {t("Available")}: {quickAddDialog.item?.availableQty || 0}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setQuickAddDialog({ open: false, item: null })}
            >
              {t("Cancel")}
            </Button>
            <Button onClick={handleQuickAdd}>
              <Plus className="w-4 h-4 mr-2" />
              {t("Add to Cart")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
