import { motion, AnimatePresence } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import { useMemo, useState } from "react";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import {
  Plus,
  Search,
  Filter,
  Grid,
  List,
  Edit,
  Trash2,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { inventoryItems } from "@/data/inventory";
import type { InventoryItem } from "@/types/inventoryTypes";

const statusConfig = {
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

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
};

const emptyNewItem: Omit<InventoryItem, "id"> = {
  name: "",
  image: "",
  wholesalePrice: 0,
  sellingPrice: 0,
  quantity: 0,
  sold: 0,
  status: "in-stock",
  confirmedByApprentice: true,
};

const Inventory = () => {
  const { user } = useAuth();
  const userRole = user?.role;
  const [items, setItems] = useState<InventoryItem[]>(inventoryItems);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newItem, setNewItem] =
    useState<Omit<InventoryItem, "id">>(emptyNewItem);

  const filteredItems = useMemo(
    () =>
      items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [items, searchQuery]
  );

  const handleAddItem = () => {
    const trimmedName = newItem.name.trim();
    if (!trimmedName) return;

    const itemToAdd: InventoryItem = {
      ...newItem,
      id: `${Date.now()}`,
      name: trimmedName,
      image:
        newItem.image.trim() ||
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    };

    setItems((prev) => [itemToAdd, ...prev]);
    setNewItem(emptyNewItem);
    setIsAddOpen(false);
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Inventory
            </h1>
            <p className="text-muted-foreground">
              Manage your products and stock levels
            </p>
          </div>
          {userRole === "owner" && (
            <Button
              onClick={() => setIsAddOpen(true)}
              className="bg-gradient-accent text-accent-foreground hover:opacity-90 glow-accent"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Item
            </Button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
            <div className="flex items-center border rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  viewMode === "grid"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
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
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl border p-4 card-elevated">
            <p className="text-sm text-muted-foreground">Total Items</p>
            <p className="text-2xl font-display font-bold text-foreground">
              {items.length}
            </p>
          </div>
          <div className="bg-card rounded-xl border p-4 card-elevated">
            <p className="text-sm text-muted-foreground">In Stock</p>
            <p className="text-2xl font-display font-bold text-success">
              {items.filter((i) => i.status === "in-stock").length}
            </p>
          </div>
          <div className="bg-card rounded-xl border p-4 card-elevated">
            <p className="text-sm text-muted-foreground">Low Stock</p>
            <p className="text-2xl font-display font-bold text-warning">
              {items.filter((i) => i.status === "low-stock").length}
            </p>
          </div>
          <div className="bg-card rounded-xl border p-4 card-elevated">
            <p className="text-sm text-muted-foreground">Out of Stock</p>
            <p className="text-2xl font-display font-bold text-destructive">
              {items.filter((i) => i.status === "out-of-stock").length}
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
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card rounded-2xl border card-elevated card-hover overflow-hidden"
                >
                  <div className="aspect-square relative bg-muted">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <Badge
                      variant="outline"
                      className={cn(
                        "absolute top-3 right-3",
                        statusConfig[item.status].className
                      )}
                    >
                      {statusConfig[item.status].label}
                    </Badge>
                    {!item.confirmedByApprentice &&
                      userRole === "apprentice" && (
                        <div className="absolute inset-0 bg-warning/20 backdrop-blur-sm flex items-center justify-center">
                          <Button
                            size="sm"
                            className="bg-warning text-warning-foreground"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Confirm Receipt
                          </Button>
                        </div>
                      )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-2 truncate">
                      {item.name}
                    </h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Qty Available
                        </span>
                        <span className="font-medium text-foreground">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sold</span>
                        <span className="font-medium text-success">
                          {item.sold}
                        </span>
                      </div>
                      {userRole === "owner" && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Cost Price
                            </span>
                            <span className="font-medium text-foreground">
                              {formatCurrency(item.wholesalePrice)}
                            </span>
                          </div>
                        </>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Selling Price
                        </span>
                        <span className="font-medium text-accent">
                          {formatCurrency(item.sellingPrice)}
                        </span>
                      </div>
                    </div>
                    {userRole === "owner" && (
                      <div className="flex gap-2 mt-4 pt-4 border-t">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:bg-destructive/10"
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
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                        Item
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                        Status
                      </th>
                      <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                        Qty
                      </th>
                      <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                        Sold
                      </th>
                      {userRole === "owner" && (
                        <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                          Cost
                        </th>
                      )}
                      <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                        Price
                      </th>
                      <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b hover:bg-muted/30 transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <p className="font-medium text-foreground">
                                {item.name}
                              </p>
                              {!item.confirmedByApprentice && (
                                <span className="flex items-center gap-1 text-xs text-warning">
                                  <AlertTriangle className="w-3 h-3" />
                                  Pending confirmation
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge
                            variant="outline"
                            className={statusConfig[item.status].className}
                          >
                            {statusConfig[item.status].label}
                          </Badge>
                        </td>
                        <td className="p-4 text-right font-medium">
                          {item.quantity}
                        </td>
                        <td className="p-4 text-right font-medium text-success">
                          {item.sold}
                        </td>
                        {userRole === "owner" && (
                          <td className="p-4 text-right">
                            {formatCurrency(item.wholesalePrice)}
                          </td>
                        )}
                        <td className="p-4 text-right font-medium text-accent">
                          {formatCurrency(item.sellingPrice)}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            {userRole === "owner" ? (
                              <>
                                <Button variant="ghost" size="icon">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-destructive"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </>
                            ) : !item.confirmedByApprentice ? (
                              <Button
                                size="sm"
                                className="bg-warning text-warning-foreground"
                              >
                                Confirm
                              </Button>
                            ) : (
                              <Button size="sm" variant="outline">
                                Sell
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
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Item</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="name">Item Name</Label>
              <Input
                id="name"
                placeholder="e.g. Bluetooth Speaker"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Image URL (optional)</Label>
              <Input
                id="image"
                placeholder="https://..."
                value={newItem.image}
                onChange={(e) =>
                  setNewItem((prev) => ({ ...prev, image: e.target.value }))
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label htmlFor="wholesale">Cost Price (NGN)</Label>
                <Input
                  id="wholesale"
                  type="number"
                  min={0}
                  value={newItem.wholesalePrice}
                  onChange={(e) =>
                    setNewItem((prev) => ({
                      ...prev,
                      wholesalePrice: Number(e.target.value) || 0,
                    }))
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="selling">Selling Price (NGN)</Label>
                <Input
                  id="selling"
                  type="number"
                  min={0}
                  value={newItem.sellingPrice}
                  onChange={(e) =>
                    setNewItem((prev) => ({
                      ...prev,
                      sellingPrice: Number(e.target.value) || 0,
                    }))
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label htmlFor="qty">Quantity</Label>
                <Input
                  id="qty"
                  type="number"
                  min={0}
                  value={newItem.quantity}
                  onChange={(e) =>
                    setNewItem((prev) => ({
                      ...prev,
                      quantity: Number(e.target.value) || 0,
                    }))
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label>Status</Label>
                <Select
                  value={newItem.status}
                  onValueChange={(value) =>
                    setNewItem((prev) => ({
                      ...prev,
                      status: value as InventoryItem["status"],
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in-stock">In Stock</SelectItem>
                    <SelectItem value="low-stock">Low Stock</SelectItem>
                    <SelectItem value="out-of-stock">Out of Stock</SelectItem>
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
              Cancel
            </Button>
            <Button onClick={handleAddItem} disabled={!newItem.name.trim()}>
              Add Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Inventory;
