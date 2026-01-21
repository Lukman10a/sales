"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { inventoryItems } from "@/data/inventory";
import { recentSalesData } from "@/data/sales";
import { mockInvestors, mockWithdrawalRecords } from "@/data/investor";
import type { InventoryItem } from "@/types/inventoryTypes";
import type { SaleRecord } from "@/types/salesTypes";
import type { Investor, WithdrawalRecord } from "@/types/investorTypes";

interface DataContextType {
  inventory: InventoryItem[];
  setInventory: (items: InventoryItem[]) => void;
  addInventoryItem: (item: InventoryItem) => void;
  updateInventoryItem: (id: string, updates: Partial<InventoryItem>) => void;
  deleteInventoryItem: (id: string) => void;
  decrementInventory: (id: string, quantity: number) => void;

  recentSales: SaleRecord[];
  setRecentSales: (sales: SaleRecord[]) => void;
  addSaleRecord: (sale: SaleRecord) => void;

  investors: Investor[];
  updateInvestor: (id: string, updates: Partial<Investor>) => void;

  withdrawals: WithdrawalRecord[];
  updateWithdrawal: (id: string, updates: Partial<WithdrawalRecord>) => void;

  // Computed stats
  totalItemsInStock: number;
  lowStockItems: number;
  outOfStockItems: number;
  totalSalesAmount: number;
  totalItemsSold: number;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("luxa_inventory");
      return stored ? JSON.parse(stored) : inventoryItems;
    }
    return inventoryItems;
  });
  const [recentSales, setRecentSales] = useState<SaleRecord[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("luxa_sales");
      return stored ? JSON.parse(stored) : recentSalesData;
    }
    return recentSalesData;
  });
  const [investors, setInvestors] = useState<Investor[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("luxa_investors");
      return stored ? JSON.parse(stored) : mockInvestors;
    }
    return mockInvestors;
  });
  const [withdrawals, setWithdrawals] = useState<WithdrawalRecord[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("luxa_withdrawals");
      return stored ? JSON.parse(stored) : mockWithdrawalRecords;
    }
    return mockWithdrawalRecords;
  });

  // Persist to localStorage
  React.useEffect(() => {
    localStorage.setItem("luxa_inventory", JSON.stringify(inventory));
  }, [inventory]);

  React.useEffect(() => {
    localStorage.setItem("luxa_sales", JSON.stringify(recentSales));
  }, [recentSales]);

  React.useEffect(() => {
    localStorage.setItem("luxa_investors", JSON.stringify(investors));
  }, [investors]);

  React.useEffect(() => {
    localStorage.setItem("luxa_withdrawals", JSON.stringify(withdrawals));
  }, [withdrawals]);

  const addInventoryItem = (item: InventoryItem) => {
    setInventory((prev) => [item, ...prev]);
  };

  const updateInventoryItem = (id: string, updates: Partial<InventoryItem>) => {
    setInventory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    );
  };

  const deleteInventoryItem = (id: string) => {
    setInventory((prev) => prev.filter((item) => item.id !== id));
  };

  const decrementInventory = (id: string, quantity: number) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity - quantity) }
          : item,
      ),
    );
  };

  const addSaleRecord = (sale: SaleRecord) => {
    setRecentSales((prev) => [sale, ...prev]);
  };

  const updateInvestor = (id: string, updates: Partial<Investor>) => {
    setInvestors((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, ...updates } : inv)),
    );
  };

  const updateWithdrawal = (id: string, updates: Partial<WithdrawalRecord>) => {
    setWithdrawals((prev) =>
      prev.map((w) => (w.id === id ? { ...w, ...updates } : w)),
    );
  };

  // Computed stats - memoized to prevent recalculation on every render
  const totalItemsInStock = useMemo(
    () => inventory.filter((i) => i.status === "in-stock").length,
    [inventory],
  );

  const lowStockItems = useMemo(
    () => inventory.filter((i) => i.status === "low-stock").length,
    [inventory],
  );

  const outOfStockItems = useMemo(
    () => inventory.filter((i) => i.status === "out-of-stock").length,
    [inventory],
  );

  const totalSalesAmount = useMemo(
    () =>
      recentSales
        .filter((s) => s.status === "completed")
        .reduce((sum, sale) => sum + sale.total, 0),
    [recentSales],
  );

  const totalItemsSold = useMemo(
    () =>
      recentSales
        .filter((s) => s.status === "completed")
        .reduce(
          (sum, sale) =>
            sum + sale.items.reduce((sum, i) => sum + i.quantity, 0),
          0,
        ),
    [recentSales],
  );

  const value: DataContextType = useMemo(
    () => ({
      inventory,
      setInventory,
      addInventoryItem,
      updateInventoryItem,
      deleteInventoryItem,
      decrementInventory,
      recentSales,
      setRecentSales,
      addSaleRecord,
      investors,
      updateInvestor,
      withdrawals,
      updateWithdrawal,
      totalItemsInStock,
      lowStockItems,
      outOfStockItems,
      totalSalesAmount,
      totalItemsSold,
    }),
    [
      inventory,
      recentSales,
      investors,
      withdrawals,
      totalItemsInStock,
      lowStockItems,
      outOfStockItems,
      totalSalesAmount,
      totalItemsSold,
    ],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
