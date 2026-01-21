"use client";

import MainLayout from "@/components/layout/MainLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";
import { getNotificationsByRole } from "@/data/roleNotifications";

export default function Notifications() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const userRole = user?.role || "owner";
  const notifications = getNotificationsByRole(userRole);

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto space-y-6 py-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            {t("Notifications")}
          </h1>
          <p className="text-muted-foreground">
            {t("Stay updated with important alerts")}
          </p>
        </div>

        <div className="space-y-2">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={notification.read ? "opacity-60" : ""}
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3 flex-1">
                    <Bell className="w-5 h-5 mt-1 text-accent flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium text-foreground">
                        {notification.title}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                  {!notification.read && (
                    <Badge className="ml-2 bg-accent text-accent-foreground">
                      {t("New")}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
