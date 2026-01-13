import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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

interface InventoryItem {
  id: string;
  name: string;
  image: string;
  wholesalePrice: number;
  sellingPrice: number;
  quantity: number;
  sold: number;
  status: "in-stock" | "low-stock" | "out-of-stock";
  confirmedByApprentice: boolean;
}

const inventoryItems: InventoryItem[] = [
  {
    id: "1",
    name: "Samsung Galaxy A54",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=200&h=200&fit=crop",
    wholesalePrice: 150000,
    sellingPrice: 185000,
    quantity: 8,
    sold: 12,
    status: "in-stock",
    confirmedByApprentice: true,
  },
  {
    id: "2",
    name: "iPhone 15 Pro Max Case",
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=200&h=200&fit=crop",
    wholesalePrice: 2500,
    sellingPrice: 4500,
    quantity: 2,
    sold: 28,
    status: "low-stock",
    confirmedByApprentice: true,
  },
  {
    id: "3",
    name: "Wireless Earbuds Pro",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop",
    wholesalePrice: 15000,
    sellingPrice: 25000,
    quantity: 15,
    sold: 34,
    status: "in-stock",
    confirmedByApprentice: true,
  },
  {
    id: "4",
    name: "USB-C Fast Charger 65W",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=200&h=200&fit=crop",
    wholesalePrice: 8000,
    sellingPrice: 12000,
    quantity: 0,
    sold: 45,
    status: "out-of-stock",
    confirmedByApprentice: false,
  },
  {
    id: "5",
    name: "Laptop Sleeve 15\"",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop",
    wholesalePrice: 7000,
    sellingPrice: 12000,
    quantity: 22,
    sold: 8,
    status: "in-stock",
    confirmedByApprentice: true,
  },
  {
    id: "6",
    name: "Wireless Mouse",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop",
    wholesalePrice: 4000,
    sellingPrice: 7500,
    quantity: 5,
    sold: 19,
    status: "low-stock",
    confirmedByApprentice: true,
  },
];

const statusConfig = {
  "in-stock": { label: "In Stock", className: "bg-success/10 text-success border-success/20" },
  "low-stock": { label: "Low Stock", className: "bg-warning/10 text-warning border-warning/20" },
  "out-of-stock": { label: "Out of Stock", className: "bg-destructive/10 text-destructive border-destructive/20" },
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
};

const Inventory = () => {
  const [userRole, setUserRole] = useState<"owner" | "apprentice">("owner");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = inventoryItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout userRole={userRole} onRoleChange={setUserRole}>
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
            <Button className="bg-gradient-accent text-accent-foreground hover:opacity-90 glow-accent">
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
            <p className="text-2xl font-display font-bold text-foreground">{inventoryItems.length}</p>
          </div>
          <div className="bg-card rounded-xl border p-4 card-elevated">
            <p className="text-sm text-muted-foreground">In Stock</p>
            <p className="text-2xl font-display font-bold text-success">
              {inventoryItems.filter((i) => i.status === "in-stock").length}
            </p>
          </div>
          <div className="bg-card rounded-xl border p-4 card-elevated">
            <p className="text-sm text-muted-foreground">Low Stock</p>
            <p className="text-2xl font-display font-bold text-warning">
              {inventoryItems.filter((i) => i.status === "low-stock").length}
            </p>
          </div>
          <div className="bg-card rounded-xl border p-4 card-elevated">
            <p className="text-sm text-muted-foreground">Out of Stock</p>
            <p className="text-2xl font-display font-bold text-destructive">
              {inventoryItems.filter((i) => i.status === "out-of-stock").length}
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
                    {!item.confirmedByApprentice && userRole === "apprentice" && (
                      <div className="absolute inset-0 bg-warning/20 backdrop-blur-sm flex items-center justify-center">
                        <Button size="sm" className="bg-warning text-warning-foreground">
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
                        <span className="text-muted-foreground">Qty Available</span>
                        <span className="font-medium text-foreground">{item.quantity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sold</span>
                        <span className="font-medium text-success">{item.sold}</span>
                      </div>
                      {userRole === "owner" && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Cost Price</span>
                            <span className="font-medium text-foreground">
                              {formatCurrency(item.wholesalePrice)}
                            </span>
                          </div>
                        </>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Selling Price</span>
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
                        <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
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
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Item</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-right p-4 text-sm font-medium text-muted-foreground">Qty</th>
                      <th className="text-right p-4 text-sm font-medium text-muted-foreground">Sold</th>
                      {userRole === "owner" && (
                        <th className="text-right p-4 text-sm font-medium text-muted-foreground">Cost</th>
                      )}
                      <th className="text-right p-4 text-sm font-medium text-muted-foreground">Price</th>
                      <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <p className="font-medium text-foreground">{item.name}</p>
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
                          <Badge variant="outline" className={statusConfig[item.status].className}>
                            {statusConfig[item.status].label}
                          </Badge>
                        </td>
                        <td className="p-4 text-right font-medium">{item.quantity}</td>
                        <td className="p-4 text-right font-medium text-success">{item.sold}</td>
                        {userRole === "owner" && (
                          <td className="p-4 text-right">{formatCurrency(item.wholesalePrice)}</td>
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
                                <Button variant="ghost" size="icon" className="text-destructive">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </>
                            ) : !item.confirmedByApprentice ? (
                              <Button size="sm" className="bg-warning text-warning-foreground">
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
    </MainLayout>
  );
};

export default Inventory;
