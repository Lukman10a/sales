import { useLanguage } from "@/contexts/LanguageContext";

interface InventoryStatsProps {
  totalItems: number;
  inStock: number;
  lowStock: number;
  outOfStock: number;
}

export default function InventoryStats({
  totalItems,
  inStock,
  lowStock,
  outOfStock,
}: InventoryStatsProps) {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <div className="bg-card rounded-xl border p-3 sm:p-4 card-elevated">
        <p className="text-xs sm:text-sm text-muted-foreground">
          {t("Total Items")}
        </p>
        <p className="text-xl sm:text-2xl font-display font-bold text-foreground">
          {totalItems}
        </p>
      </div>
      <div className="bg-card rounded-xl border p-3 sm:p-4 card-elevated">
        <p className="text-xs sm:text-sm text-muted-foreground">
          {t("In Stock")}
        </p>
        <p className="text-xl sm:text-2xl font-display font-bold text-success">
          {inStock}
        </p>
      </div>
      <div className="bg-card rounded-xl border p-3 sm:p-4 card-elevated">
        <p className="text-xs sm:text-sm text-muted-foreground">
          {t("Low Stock")}
        </p>
        <p className="text-xl sm:text-2xl font-display font-bold text-warning">
          {lowStock}
        </p>
      </div>
      <div className="bg-card rounded-xl border p-3 sm:p-4 card-elevated">
        <p className="text-xs sm:text-sm text-muted-foreground">
          {t("Out of Stock")}
        </p>
        <p className="text-xl sm:text-2xl font-display font-bold text-destructive">
          {outOfStock}
        </p>
      </div>
    </div>
  );
}
