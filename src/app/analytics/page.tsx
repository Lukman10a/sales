"use client";

import MainLayout from "@/components/layout/MainLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { useData } from "@/contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export default function Analytics() {
  const { t, formatCurrency } = useLanguage();
  const { totalSalesAmount, totalItemsSold } = useData();

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-6 py-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            {t("Analytics")}
          </h1>
          <p className="text-muted-foreground">
            {t("Track your business performance")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                {t("Total Sales")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">
                {formatCurrency(totalSalesAmount)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                {t("Items Sold")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {totalItemsSold}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
