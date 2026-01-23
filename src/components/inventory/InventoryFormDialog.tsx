import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { InventoryItem } from "@/types/inventoryTypes";
import { categories } from "@/data/inventory";

interface InventoryFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  item: Omit<InventoryItem, "id">;
  onItemChange: (item: Omit<InventoryItem, "id">) => void;
  onSave: () => void;
  onCancel: () => void;
  saveDisabled?: boolean;
}

export default function InventoryFormDialog({
  isOpen,
  onOpenChange,
  title,
  item,
  onItemChange,
  onSave,
  onCancel,
  saveDisabled,
}: InventoryFormDialogProps) {
  const { t } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="name">{t("Item Name")}</Label>
            <Input
              id="name"
              placeholder={t("e.g. Bluetooth Speaker")}
              value={item.name}
              onChange={(e) => onItemChange({ ...item, name: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">{t("Category")}</Label>
            <Select
              value={item.category}
              onValueChange={(value) =>
                onItemChange({ ...item, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder={t("Select category")} />
              </SelectTrigger>
              <SelectContent>
                {categories
                  .filter((c) => c !== "All")
                  .map((category) => (
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
              value={item.image}
              onChange={(e) => onItemChange({ ...item, image: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label htmlFor="wholesale">{t("Cost Price (NGN)")}</Label>
              <Input
                id="wholesale"
                type="number"
                min={0}
                value={item.wholesalePrice}
                onChange={(e) =>
                  onItemChange({
                    ...item,
                    wholesalePrice: Number(e.target.value) || 0,
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="selling">{t("Selling Price (NGN)")}</Label>
              <Input
                id="selling"
                type="number"
                min={0}
                value={item.sellingPrice}
                onChange={(e) =>
                  onItemChange({
                    ...item,
                    sellingPrice: Number(e.target.value) || 0,
                  })
                }
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
                value={item.quantity}
                onChange={(e) =>
                  onItemChange({
                    ...item,
                    quantity: Number(e.target.value) || 0,
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label>{t("Status")}</Label>
              <Select
                value={item.status}
                onValueChange={(value) =>
                  onItemChange({
                    ...item,
                    status: value as InventoryItem["status"],
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("Select status")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in-stock">{t("In Stock")}</SelectItem>
                  <SelectItem value="low-stock">{t("Low Stock")}</SelectItem>
                  <SelectItem value="out-of-stock">
                    {t("Out of Stock")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            {t("Cancel")}
          </Button>
          <Button onClick={onSave} disabled={saveDisabled}>
            {t("Save Changes")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
