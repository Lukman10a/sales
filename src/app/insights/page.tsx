"use client";

import MainLayout from "@/components/layout/MainLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export default function Insights() {
  const { t } = useLanguage();

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-6 py-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            {t("AI Insights")}
          </h1>
          <p className="text-muted-foreground">
            {t("Get intelligent recommendations for your business")}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              {t("AI Recommendations")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
              <p className="text-sm text-foreground font-medium mb-2">
                {t("Recommendation 1")}
              </p>
              <p className="text-sm text-muted-foreground">
                {t("Increase inventory for high-demand items")}
              </p>
            </div>
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm text-foreground font-medium mb-2">
                {t("Recommendation 2")}
              </p>
              <p className="text-sm text-muted-foreground">
                {t("Optimize pricing based on market trends")}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
