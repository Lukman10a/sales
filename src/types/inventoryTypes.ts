export interface InventoryItem {
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