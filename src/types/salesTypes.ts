export interface SaleItem {
  id: string;
  name: string;
  image: string;
  sellingPrice: number;
  availableQty: number;
}

export interface CartItem extends SaleItem {
  quantity: number;
  actualPrice: number;
}

export interface SaleRecord {
  id: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  soldBy: string;
  time: string;
  status: "completed" | "pending";
}