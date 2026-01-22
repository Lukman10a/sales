"use client";

import { useState, useEffect } from "react";
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
import { cn } from "@/lib/utils";
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

  // Load settings from localStorage and apply theme
  useEffect(() => {
    const savedProfile = localStorage.getItem("luxa_staff_profile");
    const savedNotifications = localStorage.getItem("luxa_staff_notifications");
    const savedAppearance = localStorage.getItem("luxa_appearance");

    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedNotifications) setNotifications(JSON.parse(savedNotifications));
    if (savedAppearance) {
      const parsed = JSON.parse(savedAppearance);
      setAppearance(parsed);
      applyTheme(parsed.theme);
    } else {
      applyTheme(appearance.theme);
    }
  }, []);

  const applyTheme = (theme: string) => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else if (theme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      if (prefersDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      toast(t("Image size must be less than 2MB"));
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast(t("Please select an image file"));
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageData = event.target?.result as string;
      setProfile({ ...profile, avatar: imageData });
      localStorage.setItem(
        "luxa_staff_profile",
        JSON.stringify({ ...profile, avatar: imageData }),
      );
      toast(t("Profile picture updated"));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = () => {
    localStorage.setItem("luxa_staff_profile", JSON.stringify(profile));
    toast(t("Profile updated successfully"));
  };

  const handleSaveNotifications = () => {
    localStorage.setItem(
      "luxa_staff_notifications",
      JSON.stringify(notifications),
    );
    toast(t("Notification preferences saved"));
  };

  const handleSaveAppearance = () => {
    localStorage.setItem("luxa_appearance", JSON.stringify(appearance));
    applyTheme(appearance.theme);
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
          <Badge className="w-fit">{t("Staff Member")}</Badge>
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
                    <p className="text-sm text-muted-foreground">
                      {t(stat.label)}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
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
                    <input
                      type="file"
                      id="avatar-upload-staff"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() =>
                        document.getElementById("avatar-upload-staff")?.click()
                      }
                    >
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
                <div className="space-y-6">
                  <div>
                    <Label className="mb-3 block">{t("Theme")}</Label>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        onClick={() => {
                          setAppearance({ ...appearance, theme: "light" });
                          applyTheme("light");
                        }}
                        className={cn(
                          "p-4 border-2 rounded-xl transition-all",
                          appearance.theme === "light"
                            ? "border-accent bg-accent/5"
                            : "border-border hover:border-accent/50",
                        )}
                      >
                        <div className="w-full h-16 bg-white rounded-lg mb-2 border" />
                        <p className="text-sm font-medium">{t("Light")}</p>
                      </button>
                      <button
                        onClick={() => {
                          setAppearance({ ...appearance, theme: "dark" });
                          applyTheme("dark");
                        }}
                        className={cn(
                          "p-4 border-2 rounded-xl transition-all",
                          appearance.theme === "dark"
                            ? "border-accent bg-accent/5"
                            : "border-border hover:border-accent/50",
                        )}
                      >
                        <div className="w-full h-16 bg-slate-900 rounded-lg mb-2 border" />
                        <p className="text-sm font-medium">{t("Dark")}</p>
                      </button>
                      <button
                        onClick={() => {
                          setAppearance({ ...appearance, theme: "system" });
                          applyTheme("system");
                        }}
                        className={cn(
                          "p-4 border-2 rounded-xl transition-all",
                          appearance.theme === "system"
                            ? "border-accent bg-accent/5"
                            : "border-border hover:border-accent/50",
                        )}
                      >
                        <div className="w-full h-16 bg-gradient-to-r from-white to-slate-900 rounded-lg mb-2 border" />
                        <p className="text-sm font-medium">{t("System")}</p>
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label className="mb-3 block">{t("Language")}</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant={
                          appearance.language === "en" ? "default" : "outline"
                        }
                        className="flex-1"
                        onClick={() =>
                          setAppearance({ ...appearance, language: "en" })
                        }
                      >
                        English
                      </Button>
                      <Button
                        variant={
                          appearance.language === "ar" ? "default" : "outline"
                        }
                        className="flex-1"
                        onClick={() =>
                          setAppearance({ ...appearance, language: "ar" })
                        }
                      >
                        العربية
                      </Button>
                    </div>
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
