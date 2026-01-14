"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { inventoryItems } from "@/data/inventory";
import { recentSalesData } from "@/data/sales";
import type { InventoryItem } from "@/types/inventoryTypes";
import type { SaleRecord } from "@/types/salesTypes";

interface DataContextType {
  inventory: InventoryItem[];
  setInventory: (items: InventoryItem[]) => void;
  addInventoryItem: (item: InventoryItem) => void;
  updateInventoryItem: (id: string, updates: Partial<InventoryItem>) => void;
  decrementInventory: (id: string, quantity: number) => void;

  recentSales: SaleRecord[];
  setRecentSales: (sales: SaleRecord[]) => void;
  addSaleRecord: (sale: SaleRecord) => void;

  // Computed stats
  totalItemsInStock: number;
  lowStockItems: number;
  outOfStockItems: number;
  totalSalesAmount: number;
  totalItemsSold: number;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [inventory, setInventory] = useState<InventoryItem[]>(inventoryItems);
  const [recentSales, setRecentSales] = useState<SaleRecord[]>(recentSalesData);

  const addInventoryItem = (item: InventoryItem) => {
    setInventory((prev) => [item, ...prev]);
  };

  const updateInventoryItem = (id: string, updates: Partial<InventoryItem>) => {
    setInventory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const decrementInventory = (id: string, quantity: number) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity - quantity) }
          : item
      )
    );
  };

  const addSaleRecord = (sale: SaleRecord) => {
    setRecentSales((prev) => [sale, ...prev]);
  };

  // Computed stats
  const totalItemsInStock = inventory.filter(
    (i) => i.status === "in-stock"
  ).length;
  const lowStockItems = inventory.filter(
    (i) => i.status === "low-stock"
  ).length;
  const outOfStockItems = inventory.filter(
    (i) => i.status === "out-of-stock"
  ).length;
  const totalSalesAmount = recentSales
    .filter((s) => s.status === "completed")
    .reduce((sum, sale) => sum + sale.total, 0);
  const totalItemsSold = recentSales
    .filter((s) => s.status === "completed")
    .reduce(
      (sum, sale) => sum + sale.items.reduce((sum, i) => sum + i.quantity, 0),
      0
    );

  const value: DataContextType = {
    inventory,
    setInventory,
    addInventoryItem,
    updateInventoryItem,
    decrementInventory,
    recentSales,
    setRecentSales,
    addSaleRecord,
    totalItemsInStock,
    lowStockItems,
    outOfStockItems,
    totalSalesAmount,
    totalItemsSold,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
