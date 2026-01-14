import { InventoryItem } from "@/types/inventoryTypes";

export const inventoryItems: InventoryItem[] = [
  {
    id: "1",
    name: "Samsung Galaxy A54",
    image:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=200&h=200&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=200&h=200&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=200&h=200&fit=crop",
    wholesalePrice: 8000,
    sellingPrice: 12000,
    quantity: 0,
    sold: 45,
    status: "out-of-stock",
    confirmedByApprentice: false,
  },
  {
    id: "5",
    name: 'Laptop Sleeve 15"',
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop",
    wholesalePrice: 4000,
    sellingPrice: 7500,
    quantity: 5,
    sold: 19,
    status: "low-stock",
    confirmedByApprentice: true,
  },
];