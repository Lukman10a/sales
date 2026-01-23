import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Truck, Package, AlertTriangle } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { InventoryItem } from "@/types/inventoryTypes";
import { useLanguage } from "@/contexts/LanguageContext";
import { statusConfig } from "./inventoryConfig";

interface ItemBasicInfoCardProps {
  item: InventoryItem;
}

export default function ItemBasicInfoCard({ item }: ItemBasicInfoCardProps) {
  const { t } = useLanguage();
  const StatusIcon = statusConfig[item.status].icon;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="aspect-square relative bg-muted rounded-xl overflow-hidden mb-4">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-3">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {item.name}
            </h1>
            <Badge
              variant="outline"
              className={cn("gap-2", statusConfig[item.status].className)}
            >
              <StatusIcon className="w-3 h-3" />
              {t(statusConfig[item.status].label)}
            </Badge>
          </div>

          <div className="pt-4 border-t space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("Category")}
              </span>
              <Badge variant="secondary">{item.category}</Badge>
            </div>
            {item.sku && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {t("SKU")}
                </span>
                <span className="text-sm font-mono font-medium">
                  {item.sku}
                </span>
              </div>
            )}
            {item.supplier && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Truck className="w-3 h-3" />
                  {t("Supplier")}
                </span>
                <span className="text-sm font-medium">{item.supplier}</span>
              </div>
            )}
            {item.lastRestocked && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {t("Last Restocked")}
                </span>
                <span className="text-sm font-medium">
                  {new Date(item.lastRestocked).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface StockAlertCardProps {
  item: InventoryItem;
}

export function StockAlertCard({ item }: StockAlertCardProps) {
  const { t } = useLanguage();

  if (item.status !== "low-stock" || !item.reorderPoint) return null;

  return (
    <Card className="border-warning">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2 text-warning">
          <AlertTriangle className="w-4 h-4" />
          {t("Low Stock Alert")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {t(
            "Stock is below reorder point of {point} units. Consider restocking soon.",
            { values: { point: item.reorderPoint } },
          )}
        </p>
      </CardContent>
    </Card>
  );
}
