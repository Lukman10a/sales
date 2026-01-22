"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Bell,
  Palette,
  Camera,
  Save,
  Package,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import { toast } from "@/components/ui/sonner";

export default function StaffProfile() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: user?.firstName + " " + user?.lastName || "Staff Member",
    email: user?.email || "",
    phone: "",
    avatar: user?.avatar || "",
    bio: "",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    stockAlerts: true,
    newProducts: true,
    priceUpdates: true,
  });

  const [appearance, setAppearance] = useState({
    theme: "dark",
    language: "en",
    compactMode: false,
  });

  const handleSaveProfile = () => {
    toast(t("Profile updated successfully"));
  };

  const handleSaveNotifications = () => {
    toast(t("Notification preferences saved"));
  };

  const handleSaveAppearance = () => {
    toast(t("Appearance settings saved"));
  };

  // Mock performance stats
  const performanceStats = [
    {
      label: "Items Sold Today",
      value: "24",
      icon: ShoppingCart,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Stock Confirmations",
      value: "12",
      icon: Package,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      label: "Accuracy Rate",
      value: "98.5%",
      icon: TrendingUp,
      color: "text-success",
      bgColor: "bg-success/10",
    },
  ];

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">
              {t("Staff Profile & Settings")}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              {t("Manage your profile and preferences")}
            </p>
          </div>
          <Badge className="w-fit">
            {t("Staff Member")}
          </Badge>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {performanceStats.map((stat) => (
            <Card key={stat.label} className="card-elevated">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t(stat.label)}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile" className="gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">{t("Profile")}</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">{t("Notifications")}</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="gap-2">
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">{t("Appearance")}</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>{t("Personal Information")}</CardTitle>
                <CardDescription>
                  {t("Update your personal details and profile picture")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profile.avatar} alt={profile.name} />
                    <AvatarFallback className="text-2xl">
                      {profile.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Camera className="w-4 h-4" />
                      {t("Change Photo")}
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      {t("JPG, PNG or GIF. Max size 2MB")}
                    </p>
                  </div>
                </div>

                {/* Form */}
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">{t("Full Name")}</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">{t("Email")}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="phone">{t("Phone")}</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile({ ...profile, phone: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="bio">{t("Bio")}</Label>
                    <Textarea
                      id="bio"
                      rows={4}
                      value={profile.bio}
                      onChange={(e) =>
                        setProfile({ ...profile, bio: e.target.value })
                      }
                      placeholder={t("Tell us about yourself...")}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveProfile} className="gap-2">
                    <Save className="w-4 h-4" />
                    {t("Save Changes")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-4">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>{t("Notification Preferences")}</CardTitle>
                <CardDescription>
                  {t("Choose how you want to receive notifications")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">
                    {t("Notification Channels")}
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notif">
                          {t("Email Notifications")}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {t("Receive notifications via email")}
                        </p>
                      </div>
                      <Switch
                        id="email-notif"
                        checked={notifications.email}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, email: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="push-notif">
                          {t("Push Notifications")}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {t("Receive push notifications in browser")}
                        </p>
                      </div>
                      <Switch
                        id="push-notif"
                        checked={notifications.push}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, push: checked })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6 space-y-4">
                  <h4 className="font-medium text-foreground">
                    {t("Notification Types")}
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="stock-alerts">
                          {t("Stock Alerts")}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {t("Get notified about stock level changes")}
                        </p>
                      </div>
                      <Switch
                        id="stock-alerts"
                        checked={notifications.stockAlerts}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            stockAlerts: checked,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="new-products">
                          {t("New Product Additions")}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {t("Notifications for new inventory items")}
                        </p>
                      </div>
                      <Switch
                        id="new-products"
                        checked={notifications.newProducts}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            newProducts: checked,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="price-updates">
                          {t("Price Updates")}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {t("Get notified when prices change")}
                        </p>
                      </div>
                      <Switch
                        id="price-updates"
                        checked={notifications.priceUpdates}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            priceUpdates: checked,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t">
                  <Button onClick={handleSaveNotifications} className="gap-2">
                    <Save className="w-4 h-4" />
                    {t("Save Preferences")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-4">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>{t("Appearance Settings")}</CardTitle>
                <CardDescription>
                  {t("Customize how the application looks")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="theme">{t("Theme")}</Label>
                    <Select
                      value={appearance.theme}
                      onValueChange={(value) =>
                        setAppearance({ ...appearance, theme: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">{t("Light")}</SelectItem>
                        <SelectItem value="dark">{t("Dark")}</SelectItem>
                        <SelectItem value="system">{t("System")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="language">{t("Language")}</Label>
                    <Select
                      value={appearance.language}
                      onValueChange={(value) =>
                        setAppearance({ ...appearance, language: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ar">العربية (Arabic)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="space-y-0.5">
                      <Label htmlFor="compact-mode">{t("Compact Mode")}</Label>
                      <p className="text-sm text-muted-foreground">
                        {t("Reduce spacing throughout the app")}
                      </p>
                    </div>
                    <Switch
                      id="compact-mode"
                      checked={appearance.compactMode}
                      onCheckedChange={(checked) =>
                        setAppearance({ ...appearance, compactMode: checked })
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t">
                  <Button onClick={handleSaveAppearance} className="gap-2">
                    <Save className="w-4 h-4" />
                    {t("Save Changes")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
