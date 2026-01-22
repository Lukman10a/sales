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
  DollarSign,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { toast } from "@/components/ui/sonner";

export default function InvestorProfile() {
  const { t, formatCurrency, setLanguage } = useLanguage();
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState({
    name: user?.firstName + " " + user?.lastName || "Investor",
    email: user?.email || "",
    phone: "",
    avatar: user?.avatar || "",
    bio: "",
    bankName: "",
    accountNumber: "",
    accountName: "",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    withdrawalStatus: true,
    monthlyReports: true,
    profitAlerts: true,
  });

  const [appearance, setAppearance] = useState({
    theme: "light",
    language: "en",
    currency: "NGN",
    compactMode: false,
  });

  // Load settings from localStorage and apply theme
  useEffect(() => {
    const savedProfile = localStorage.getItem("luxa_investor_profile");
    const savedNotifications = localStorage.getItem(
      "luxa_investor_notifications",
    );
    const savedAppearance = localStorage.getItem("luxa_appearance");

    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedNotifications) setNotifications(JSON.parse(savedNotifications));
    if (savedAppearance) {
      const parsed = JSON.parse(savedAppearance);
      setAppearance(parsed);
      applyTheme(parsed.theme);
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
        "luxa_investor_profile",
        JSON.stringify({ ...profile, avatar: imageData }),
      );
      updateUser({ avatar: imageData });
      toast(t("Profile picture updated"));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = () => {
    localStorage.setItem("luxa_investor_profile", JSON.stringify(profile));
    toast(t("Profile updated successfully"));
  };

  const handleSaveNotifications = () => {
    localStorage.setItem(
      "luxa_investor_notifications",
      JSON.stringify(notifications),
    );
    toast(t("Notification preferences saved"));
  };

  const handleSaveAppearance = () => {
    localStorage.setItem("luxa_appearance", JSON.stringify(appearance));
    applyTheme(appearance.theme);
    toast(t("Appearance settings saved"));
  };

  // Mock investment stats
  const investmentStats = [
    {
      label: "Total Invested",
      value: formatCurrency(500000),
      icon: Wallet,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Total Returns",
      value: formatCurrency(125000),
      icon: DollarSign,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      label: "ROI",
      value: "25%",
      icon: TrendingUp,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ];

  return (
    <MainLayout requireRole="investor">
      <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">
              {t("Investor Profile & Settings")}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              {t("Manage your investment profile and preferences")}
            </p>
          </div>
          <Badge
            variant="outline"
            className="bg-success/10 text-success border-success/20 w-fit"
          >
            {t("Investor")}
          </Badge>
        </div>

        {/* Investment Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {investmentStats.map((stat) => (
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
                      id="avatar-upload-investor"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() =>
                        document
                          .getElementById("avatar-upload-investor")
                          ?.click()
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
                  <div className="grid sm:grid-cols-2 gap-4">
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

                  <div className="border-t pt-4">
                    <h4 className="font-medium text-foreground mb-4">
                      {t("Banking Information")}
                    </h4>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="bank-name">{t("Bank Name")}</Label>
                        <Input
                          id="bank-name"
                          value={profile.bankName}
                          onChange={(e) =>
                            setProfile({ ...profile, bankName: e.target.value })
                          }
                          placeholder={t("e.g. First Bank")}
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="account-number">
                            {t("Account Number")}
                          </Label>
                          <Input
                            id="account-number"
                            value={profile.accountNumber}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                accountNumber: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="account-name">
                            {t("Account Name")}
                          </Label>
                          <Input
                            id="account-name"
                            value={profile.accountName}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                accountName: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
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
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sms-notif">
                          {t("SMS Notifications")}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {t("Receive notifications via SMS")}
                        </p>
                      </div>
                      <Switch
                        id="sms-notif"
                        checked={notifications.sms}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, sms: checked })
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
                        <Label htmlFor="withdrawal-status">
                          {t("Withdrawal Status")}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {t("Updates on your withdrawal requests")}
                        </p>
                      </div>
                      <Switch
                        id="withdrawal-status"
                        checked={notifications.withdrawalStatus}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            withdrawalStatus: checked,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="monthly-reports">
                          {t("Monthly Reports")}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {t("Receive monthly investment summaries")}
                        </p>
                      </div>
                      <Switch
                        id="monthly-reports"
                        checked={notifications.monthlyReports}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            monthlyReports: checked,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="profit-alerts">
                          {t("Profit Alerts")}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {t("Get notified about profit distributions")}
                        </p>
                      </div>
                      <Switch
                        id="profit-alerts"
                        checked={notifications.profitAlerts}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            profitAlerts: checked,
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
                        onClick={() => {
                          setAppearance({ ...appearance, language: "en" });
                          setLanguage("en");
                          localStorage.setItem(
                            "luxa_appearance",
                            JSON.stringify({ ...appearance, language: "en" }),
                          );
                        }}
                      >
                        English
                      </Button>
                      <Button
                        variant={
                          appearance.language === "ar" ? "default" : "outline"
                        }
                        className="flex-1"
                        onClick={() => {
                          setAppearance({ ...appearance, language: "ar" });
                          setLanguage("ar");
                          localStorage.setItem(
                            "luxa_appearance",
                            JSON.stringify({ ...appearance, language: "ar" }),
                          );
                        }}
                      >
                        العربية
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label className="mb-3 block">
                      {t("Currency Display")}
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant={
                          appearance.currency === "NGN" ? "default" : "outline"
                        }
                        onClick={() =>
                          setAppearance({ ...appearance, currency: "NGN" })
                        }
                      >
                        ₦ Naira (NGN)
                      </Button>
                      <Button
                        variant={
                          appearance.currency === "USD" ? "default" : "outline"
                        }
                        onClick={() =>
                          setAppearance({ ...appearance, currency: "USD" })
                        }
                      >
                        $ Dollar (USD)
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
