"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Search,
  Filter,
  Grid,
  List,
  Package,
  Edit,
  Trash2,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { InventoryItem } from "@/types/inventoryTypes";
import { toast } from "@/components/ui/sonner";
import { categories } from "@/data/inventory";
import StockAlerts from "@/components/inventory/StockAlerts";

const statusConfig: Record<InventoryItem["status"], { label: string; className: string }> = {
  "in-stock": {
    label: "In Stock",
    className: "bg-success/10 text-success border-success/20",
  },
  "low-stock": {
    label: "Low Stock",
    className: "bg-warning/10 text-warning border-warning/20",
  },
  "out-of-stock": {
    label: "Out of Stock",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
};

const emptyNewItem: Omit<InventoryItem, "id"> = {
  name: "",
  category: "Accessories",
  image: "",
  wholesalePrice: 0,
  sellingPrice: 0,
  quantity: 0,
  sold: 0,
  status: "in-stock",
  confirmedByApprentice: true,
};

export default function Inventory() {
  const { user } = useAuth();
  const { inventory, addInventoryItem, updateInventoryItem, deleteInventoryItem } = useData();
  const userRole = user?.role || "owner";
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("name");
  const [showFilters, setShowFilters] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<Omit<InventoryItem, "id"> | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<InventoryItem | null>(null);
  const [newItem, setNewItem] = useState<Omit<InventoryItem, "id">>(emptyNewItem);
  const { t, formatCurrency, isRTL } = useLanguage();

  const filteredItems = useMemo(() => {
    let items = inventory.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    if (filterStatus !== "all") items = items.filter((item) => item.status === filterStatus);
    if (filterCategory !== "All") items = items.filter((item) => item.category === filterCategory);

    items = [...items].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price-asc":
          return a.sellingPrice - b.sellingPrice;
        case "price-desc":
          return b.sellingPrice - a.sellingPrice;
        case "quantity-asc":
          return a.quantity - b.quantity;
        case "quantity-desc":
          return b.quantity - a.quantity;
        case "sold-desc":
          return b.sold - a.sold;
        default:
          return 0;
      }
    });

    return items;
  }, [inventory, searchQuery, filterStatus, filterCategory, sortBy]);

  const handleAddItem = () => {
    const trimmedName = newItem.name.trim();
    if (!trimmedName) {
      toast(t("Please enter an item name"));
      return;
    }

    const itemToAdd: InventoryItem = {
      ...newItem,
      id: `${Date.now()}`,
      name: trimmedName,
      image:
        newItem.image.trim() ||
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    };

    addInventoryItem(itemToAdd);
    setNewItem(emptyNewItem);
    setIsAddOpen(false);
    toast(t("Item added successfully"));
  };

  const handleEditItem = (item: InventoryItem) => {
    setEditingId(item.id);
    setEditingItem({
      name: item.name,
      category: item.category,
      image: item.image,
      wholesalePrice: item.wholesalePrice,
      sellingPrice: item.sellingPrice,
      quantity: item.quantity,
      sold: item.sold,
      status: item.status,
      confirmedByApprentice: item.confirmedByApprentice,
    });
  };

  const handleSaveEdit = () => {
    if (!editingId || !editingItem) return;
    const trimmedName = editingItem.name.trim();
    if (!trimmedName) {
      toast(t("Please enter an item name"));
      return;
    }
    updateInventoryItem(editingId, { ...editingItem, name: trimmedName });
    setEditingId(null);
    setEditingItem(null);
    toast(t("Item updated successfully"));
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    deleteInventoryItem(deleteTarget.id);
    toast(t("Item deleted successfully"));
    setDeleteTarget(null);
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">
              {t("Inventory")}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              {t("Manage your products and stock levels")}
            </p>
          </div>
          {userRole === "owner" && (
            <Button
              onClick={() => setIsAddOpen(true)}
              className="bg-gradient-accent text-accent-foreground hover:opacity-90 glow-accent w-full sm:w-auto"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              {t("Add New Item")}
            </Button>
          )}
        </div>

        {/* Stock Alerts */}
        <StockAlerts />

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
          <div className="relative flex-1 max-w-full sm:max-w-md">
            <Search
              className={
                isRTL
                  ? "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                  : "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
              }
            />
            <Input
              placeholder={t("Search items...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={isRTL ? "pr-10" : "pl-10"}
            />
          </div>
          <div className="flex items-center gap-2 justify-end">
            <Button
              variant="outline"
              size="icon"
              className="flex-shrink-0"
              onClick={() => setShowFilters((prev) => !prev)}
            >
              <Filter className="w-4 h-4" />
            </Button>
            <div className="flex items-center border rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  viewMode === "grid"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  viewMode === "list"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-card rounded-xl border p-4 space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>{t("Status")}</Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("All Statuses")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("All Statuses")}</SelectItem>
                      <SelectItem value="in-stock">{t("In Stock")}</SelectItem>
                      <SelectItem value="low-stock">{t("Low Stock")}</SelectItem>
                      <SelectItem value="out-of-stock">{t("Out of Stock")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{t("Category")}</Label>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("All Categories")} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {t(category)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{t("Sort By")}</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("Sort by")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">{t("Name (A-Z)")}</SelectItem>
                      <SelectItem value="price-asc">{t("Price (Low to High)")}</SelectItem>
                      <SelectItem value="price-desc">{t("Price (High to Low)")}</SelectItem>
                      <SelectItem value="quantity-desc">{t("Quantity (High to Low)")}</SelectItem>
                      <SelectItem value="quantity-asc">{t("Quantity (Low to High)")}</SelectItem>
                      <SelectItem value="sold-desc">{t("Most Sold")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t">
                <p className="text-sm text-muted-foreground">
                  {t("Showing {count} items", { values: { count: filteredItems.length } })}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setFilterStatus("all");
                    setFilterCategory("All");
                    setSortBy("name");
                  }}
                >
                  {t("Clear Filters")}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-card rounded-xl border p-3 sm:p-4 card-elevated">
            <p className="text-xs sm:text-sm text-muted-foreground">{t("Total Items")}</p>
            <p className="text-xl sm:text-2xl font-display font-bold text-foreground">{inventory.length}</p>
          </div>
          <div className="bg-card rounded-xl border p-3 sm:p-4 card-elevated">
            <p className="text-xs sm:text-sm text-muted-foreground">{t("In Stock")}</p>
            <p className="text-xl sm:text-2xl font-display font-bold text-success">
              {inventory.filter((i) => i.status === "in-stock").length}
            </p>
          </div>
          <div className="bg-card rounded-xl border p-3 sm:p-4 card-elevated">
            <p className="text-xs sm:text-sm text-muted-foreground">{t("Low Stock")}</p>
            <p className="text-xl sm:text-2xl font-display font-bold text-warning">
              {inventory.filter((i) => i.status === "low-stock").length}
            </p>
          </div>
          <div className="bg-card rounded-xl border p-3 sm:p-4 card-elevated">
            <p className="text-xs sm:text-sm text-muted-foreground">{t("Out of Stock")}</p>
            <p className="text-xl sm:text-2xl font-display font-bold text-destructive">
              {inventory.filter((i) => i.status === "out-of-stock").length}
            </p>
          </div>
        </div>

        {/* Items Grid/List */}
        <AnimatePresence mode="wait">
          {viewMode === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4"
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card rounded-2xl border card-elevated card-hover overflow-hidden"
                >
                  <Link href={`/inventory/${item.id}`} className="block">
                    <div className="aspect-square relative bg-muted">
                      <Image
                        width={100}
                        height={100}
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <Badge
                        variant="outline"
                        className={cn(
                          "absolute top-3 right-3",
                          statusConfig[item.status].className,
                        )}
                      >
                        {t(statusConfig[item.status].label)}
                      </Badge>
                      {!item.confirmedByApprentice && userRole === "apprentice" && (
                        <div className="absolute inset-0 bg-warning/20 backdrop-blur-sm flex items-center justify-center">
                          <Button size="sm" className="bg-warning text-warning-foreground">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            {t("Confirm Receipt")}
                          </Button>
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-foreground truncate">{item.name}</h3>
                      <Badge variant="secondary">{item.category}</Badge>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t("Qty Available")}</span>
                        <span className="font-medium text-foreground">{item.quantity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t("Sold")}</span>
                        <span className="font-medium text-success">{item.sold}</span>
                      </div>
                      {userRole === "owner" && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t("Cost Price")}</span>
                          <span className="font-medium text-foreground">{formatCurrency(item.wholesalePrice)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t("Selling Price")}</span>
                        <span className="font-medium text-accent">{formatCurrency(item.sellingPrice)}</span>
                      </div>
                    </div>
                    {userRole === "owner" && (
                      <div className="flex gap-2 mt-4 pt-4 border-t">
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEditItem(item)}>
                          <Edit className="w-3 h-3 mr-1" />
                          {t("Edit")}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => setDeleteTarget(item)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-card rounded-2xl border card-elevated overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t("Item")}</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t("Status")}</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t("Category")}</th>
                      <th className="text-right p-4 text-sm font-medium text-muted-foreground">{t("Qty")}</th>
                      <th className="text-right p-4 text-sm font-medium text-muted-foreground">{t("Sold")}</th>
                      {userRole === "owner" && (
                        <th className="text-right p-4 text-sm font-medium text-muted-foreground">{t("Cost")}</th>
                      )}
                      <th className="text-right p-4 text-sm font-medium text-muted-foreground">{t("Price")}</th>
                      <th className="text-right p-4 text-sm font-medium text-muted-foreground">{t("Actions")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <Image
                              width={20}
                              height={20}
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <Link href={`/inventory/${item.id}`} className="font-medium text-foreground hover:underline">
                                {item.name}
                              </Link>
                              {!item.confirmedByApprentice && (
                                <span className="flex items-center gap-1 text-xs text-warning">
                                  <AlertTriangle className="w-3 h-3" />
                                  {t("Pending confirmation")}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" className={statusConfig[item.status].className}>
                            {t(statusConfig[item.status].label)}
                          </Badge>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">{item.category}</td>
                        <td className="p-4 text-right font-medium">{item.quantity}</td>
                        <td className="p-4 text-right font-medium text-success">{item.sold}</td>
                        {userRole === "owner" && (
                          <td className="p-4 text-right">{formatCurrency(item.wholesalePrice)}</td>
                        )}
                        <td className="p-4 text-right font-medium text-accent">{formatCurrency(item.sellingPrice)}</td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            {userRole === "owner" ? (
                              <>
                                <Button variant="ghost" size="icon" onClick={() => handleEditItem(item)}>
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  onClick={() => setDeleteTarget(item)}
                                  className="text-destructive"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </>
                            ) : !item.confirmedByApprentice ? (
                              <Button size="sm" className="bg-warning text-warning-foreground">
                                {t("Confirm")}
                              </Button>
                            ) : (
                              <Button size="sm" variant="outline">
                                {t("Sell")}
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Add Item Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{t("Add New Item")}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="name">{t("Item Name")}</Label>
              <Input
                id="name"
                placeholder={t("e.g. Bluetooth Speaker")}
                value={newItem.name}
                onChange={(e) => setNewItem((prev) => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">{t("Category")}</Label>
              <Select
                value={newItem.category}
                onValueChange={(value) => setNewItem((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("Select category")} />
                </SelectTrigger>
                <SelectContent>
                  {categories.filter((c) => c !== "All").map((category) => (
                    <SelectItem key={category} value={category}>
                      {t(category)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">{t("Image URL (optional)")}</Label>
              <Input
                id="image"
                placeholder="https://..."
                value={newItem.image}
                onChange={(e) => setNewItem((prev) => ({ ...prev, image: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label htmlFor="wholesale">{t("Cost Price (NGN)")}</Label>
                <Input
                  id="wholesale"
                  type="number"
                  min={0}
                  value={newItem.wholesalePrice}
                  onChange={(e) => setNewItem((prev) => ({ ...prev, wholesalePrice: Number(e.target.value) || 0 }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="selling">{t("Selling Price (NGN)")}</Label>
                <Input
                  id="selling"
                  type="number"
                  min={0}
                  value={newItem.sellingPrice}
                  onChange={(e) => setNewItem((prev) => ({ ...prev, sellingPrice: Number(e.target.value) || 0 }))}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label htmlFor="qty">{t("Quantity")}</Label>
                <Input
                  id="qty"
                  type="number"
                  min={0}
                  value={newItem.quantity}
                  onChange={(e) => setNewItem((prev) => ({ ...prev, quantity: Number(e.target.value) || 0 }))}
                />
              </div>
              <div className="grid gap-2">
                <Label>{t("Status")}</Label>
                <Select
                  value={newItem.status}
                  onValueChange={(value) =>
                    setNewItem((prev) => ({ ...prev, status: value as InventoryItem["status"] }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("Select status")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in-stock">{t("In Stock")}</SelectItem>
                    <SelectItem value="low-stock">{t("Low Stock")}</SelectItem>
                    <SelectItem value="out-of-stock">{t("Out of Stock")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsAddOpen(false);
                setNewItem(emptyNewItem);
              }}
            >
              {t("Cancel")}
            </Button>
            <Button onClick={handleAddItem} disabled={!newItem.name.trim()}>
              {t("Add Item")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Item Dialog */}
      <Dialog
        open={editingId !== null}
        onOpenChange={(open) => {
          if (!open) {
            setEditingId(null);
            setEditingItem(null);
          }
        }}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{t("Edit Item")}</DialogTitle>
          </DialogHeader>
          {editingItem && (
            <div className="grid gap-4 py-2">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">{t("Item Name")}</Label>
                <Input
                  id="edit-name"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem((prev) => (prev ? { ...prev, name: e.target.value } : null))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-category">{t("Category")}</Label>
                <Select
                  value={editingItem.category}
                  onValueChange={(value) => setEditingItem((prev) => (prev ? { ...prev, category: value } : null))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("Select category")} />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter((c) => c !== "All").map((category) => (
                      <SelectItem key={category} value={category}>
                        {t(category)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-image">{t("Image URL")}</Label>
                <Input
                  id="edit-image"
                  value={editingItem.image}
                  onChange={(e) => setEditingItem((prev) => (prev ? { ...prev, image: e.target.value } : null))}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-2">
                  <Label htmlFor="edit-wholesale">{t("Cost Price (NGN)")}</Label>
                  <Input
                    id="edit-wholesale"
                    type="number"
                    min={0}
                    value={editingItem.wholesalePrice}
                    onChange={(e) =>
                      setEditingItem((prev) => (prev ? { ...prev, wholesalePrice: Number(e.target.value) || 0 } : null))
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-selling">{t("Selling Price (NGN)")}</Label>
                  <Input
                    id="edit-selling"
                    type="number"
                    min={0}
                    value={editingItem.sellingPrice}
                    onChange={(e) =>
                      setEditingItem((prev) => (prev ? { ...prev, sellingPrice: Number(e.target.value) || 0 } : null))
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-2">
                  <Label htmlFor="edit-qty">{t("Quantity")}</Label>
                  <Input
                    id="edit-qty"
                    type="number"
                    min={0}
                    value={editingItem.quantity}
                    onChange={(e) =>
                      setEditingItem((prev) => (prev ? { ...prev, quantity: Number(e.target.value) || 0 } : null))
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label>{t("Status")}</Label>
                  <Select
                    value={editingItem.status}
                    onValueChange={(value) =>
                      setEditingItem((prev) => (prev ? { ...prev, status: value as InventoryItem["status"] } : null))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t("Select status")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in-stock">{t("In Stock")}</SelectItem>
                      <SelectItem value="low-stock">{t("Low Stock")}</SelectItem>
                      <SelectItem value="out-of-stock">{t("Out of Stock")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setEditingId(null);
                setEditingItem(null);
              }}
            >
              {t("Cancel")}
            </Button>
            <Button onClick={handleSaveEdit} disabled={!editingItem?.name?.trim()}>
              {t("Save Changes")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("Delete item")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("This action cannot be undone. You are about to delete {item} from inventory.", {
                values: { item: deleteTarget?.name || t("this item") },
              })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteTarget(null)}>
              {t("Cancel")}
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleConfirmDelete}
            >
              {t("Delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </MainLayout>
  );
}
