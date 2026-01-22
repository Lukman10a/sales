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
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  Bell,
  Shield,
  Palette,
  Database,
  HelpCircle,
  Camera,
  Save,
  Lock,
  Monitor,
  Globe,
  Clock,
} from "lucide-react";
import { toast } from "@/components/ui/sonner";
import {
  userProfile,
  notificationPreferences,
  securitySettings,
  appearanceSettings,
} from "@/data/profile";

export default function Profile() {
  const { t, setLanguage } = useLanguage();
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState(userProfile);
  const [notifications, setNotifications] = useState(notificationPreferences);
  const [appearance, setAppearance] = useState(appearanceSettings);

  // Load appearance settings from localStorage and apply theme
  useEffect(() => {
    const saved = localStorage.getItem("luxa_appearance");
    if (saved) {
      const parsed = JSON.parse(saved);
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
        "luxa_profile",
        JSON.stringify({ ...profile, avatar: imageData }),
      );
      updateUser({ avatar: imageData });
      toast(t("Profile picture updated"));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = () => {
    localStorage.setItem("luxa_profile", JSON.stringify(profile));
    toast(t("Profile updated successfully"));
  };

  const handleSaveNotifications = () => {
    localStorage.setItem("luxa_notifications", JSON.stringify(notifications));
    toast(t("Notification preferences saved"));
  };

  const handleSaveAppearance = () => {
    localStorage.setItem("luxa_appearance", JSON.stringify(appearance));
    applyTheme(appearance.theme);
    toast(t("Appearance settings saved"));
  };

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">
              {t("Profile & Settings")}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              {t("Manage your account settings and preferences")}
            </p>
          </div>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="profile" className="gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">{t("Profile")}</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">{t("Notifications")}</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">{t("Security")}</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="gap-2">
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">{t("Appearance")}</span>
            </TabsTrigger>
            <TabsTrigger value="data" className="gap-2">
              <Database className="w-4 h-4" />
              <span className="hidden sm:inline">{t("Data")}</span>
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
                      id="avatar-upload"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() =>
                        document.getElementById("avatar-upload")?.click()
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

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="phone">{t("Phone")}</Label>
                      <Input
                        id="phone"
                        value={profile.phone || ""}
                        onChange={(e) =>
                          setProfile({ ...profile, phone: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="company">{t("Company")}</Label>
                      <Input
                        id="company"
                        value={profile.company || ""}
                        onChange={(e) =>
                          setProfile({ ...profile, company: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="address">{t("Address")}</Label>
                    <Input
                      id="address"
                      value={profile.address || ""}
                      onChange={(e) =>
                        setProfile({ ...profile, address: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="city">{t("City")}</Label>
                      <Input
                        id="city"
                        value={profile.city || ""}
                        onChange={(e) =>
                          setProfile({ ...profile, city: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="country">{t("Country")}</Label>
                      <Input
                        id="country"
                        value={profile.country || ""}
                        onChange={(e) =>
                          setProfile({ ...profile, country: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="bio">{t("Bio")}</Label>
                    <Textarea
                      id="bio"
                      rows={4}
                      value={profile.bio || ""}
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
                        <Label htmlFor="low-stock">
                          {t("Low Stock Alerts")}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {t("Get notified when inventory is running low")}
                        </p>
                      </div>
                      <Switch
                        id="low-stock"
                        checked={notifications.lowStock}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            lowStock: checked,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="new-sales">{t("New Sales")}</Label>
                        <p className="text-sm text-muted-foreground">
                          {t("Notifications for new sales transactions")}
                        </p>
                      </div>
                      <Switch
                        id="new-sales"
                        checked={notifications.newSales}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            newSales: checked,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="reports">
                          {t("Report Generation")}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {t("Notifications when reports are ready")}
                        </p>
                      </div>
                      <Switch
                        id="reports"
                        checked={notifications.reports}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            reports: checked,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="team-activity">
                          {t("Team Activity")}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {t("Updates on team member actions")}
                        </p>
                      </div>
                      <Switch
                        id="team-activity"
                        checked={notifications.teamActivity}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            teamActivity: checked,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="ai-insights">{t("AI Insights")}</Label>
                        <p className="text-sm text-muted-foreground">
                          {t("Get notified about AI-generated insights")}
                        </p>
                      </div>
                      <Switch
                        id="ai-insights"
                        checked={notifications.aiInsights}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            aiInsights: checked,
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

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-4">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>{t("Security Settings")}</CardTitle>
                <CardDescription>
                  {t("Manage your password and security preferences")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-0.5">
                      <Label>{t("Two-Factor Authentication")}</Label>
                      <p className="text-sm text-muted-foreground">
                        {t("Add an extra layer of security to your account")}
                      </p>
                      <Badge
                        variant={
                          securitySettings.twoFactorEnabled
                            ? "default"
                            : "secondary"
                        }
                        className="mt-2"
                      >
                        {securitySettings.twoFactorEnabled
                          ? t("Enabled")
                          : t("Disabled")}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      {securitySettings.twoFactorEnabled
                        ? t("Disable")
                        : t("Enable")}
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>{t("Change Password")}</Label>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Lock className="w-4 h-4" />
                        {t("Update")}
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t("Last changed")}:{" "}
                      {new Date(
                        securitySettings.lastPasswordChange,
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>{t("Active Sessions")}</Label>
                      <Badge>
                        {securitySettings.activeSessions} {t("active")}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t("Manage devices that are currently logged in")}
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      {t("View All Sessions")}
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-medium text-foreground mb-4">
                    {t("Login History")}
                  </h4>
                  <div className="space-y-3">
                    {securitySettings.loginHistory.map((login) => (
                      <div
                        key={login.id}
                        className="flex items-start justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={cn(
                              "p-2 rounded-lg",
                              login.success
                                ? "bg-success/10"
                                : "bg-destructive/10",
                            )}
                          >
                            <Monitor
                              className={cn(
                                "w-4 h-4",
                                login.success
                                  ? "text-success"
                                  : "text-destructive",
                              )}
                            />
                          </div>
                          <div>
                            <p className="font-medium text-sm">
                              {login.device}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {login.location}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {login.ipAddress}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={
                              login.success ? "secondary" : "destructive"
                            }
                            className="mb-1"
                          >
                            {login.success ? t("Success") : t("Failed")}
                          </Badge>
                          <p className="text-xs text-muted-foreground">
                            {new Date(login.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
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
                  {t("Customize how the application looks and feels")}
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
                        }}
                      >
                        العربية
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label className="mb-3 block">{t("Currency")}</Label>
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
                      <Button
                        variant={
                          appearance.currency === "EUR" ? "default" : "outline"
                        }
                        onClick={() =>
                          setAppearance({ ...appearance, currency: "EUR" })
                        }
                      >
                        € Euro (EUR)
                      </Button>
                      <Button
                        variant={
                          appearance.currency === "GBP" ? "default" : "outline"
                        }
                        onClick={() =>
                          setAppearance({ ...appearance, currency: "GBP" })
                        }
                      >
                        £ Pound (GBP)
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label className="mb-3 block">{t("Date Format")}</Label>
                    <div className="grid grid-cols-3 gap-3">
                      <Button
                        variant={
                          appearance.dateFormat === "DD/MM/YYYY"
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          setAppearance({
                            ...appearance,
                            dateFormat: "DD/MM/YYYY",
                          })
                        }
                      >
                        DD/MM/YYYY
                      </Button>
                      <Button
                        variant={
                          appearance.dateFormat === "MM/DD/YYYY"
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          setAppearance({
                            ...appearance,
                            dateFormat: "MM/DD/YYYY",
                          })
                        }
                      >
                        MM/DD/YYYY
                      </Button>
                      <Button
                        variant={
                          appearance.dateFormat === "YYYY-MM-DD"
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          setAppearance({
                            ...appearance,
                            dateFormat: "YYYY-MM-DD",
                          })
                        }
                      >
                        YYYY-MM-DD
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label className="mb-3 block">{t("Time Format")}</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant={
                          appearance.timeFormat === "12h"
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          setAppearance({ ...appearance, timeFormat: "12h" })
                        }
                      >
                        {t("12-hour")}
                      </Button>
                      <Button
                        variant={
                          appearance.timeFormat === "24h"
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          setAppearance({ ...appearance, timeFormat: "24h" })
                        }
                      >
                        {t("24-hour")}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="space-y-0.5">
                      <Label htmlFor="compact-mode">{t("Compact Mode")}</Label>
                      <p className="text-sm text-muted-foreground">
                        {t("Reduce spacing and padding throughout the app")}
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

          {/* Data Tab */}
          <TabsContent value="data" className="space-y-4">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>{t("Data Management")}</CardTitle>
                <CardDescription>
                  {t("Export, backup, or delete your data")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg space-y-3">
                  <h4 className="font-medium text-foreground">
                    {t("Export Your Data")}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {t("Download a copy of your data in various formats")}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      {t("Export as CSV")}
                    </Button>
                    <Button variant="outline" size="sm">
                      {t("Export as JSON")}
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg space-y-3">
                  <h4 className="font-medium text-foreground">
                    {t("Backup & Restore")}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {t(
                      "Create backups of your data and restore from previous backups",
                    )}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      {t("Create Backup")}
                    </Button>
                    <Button variant="outline" size="sm">
                      {t("Restore")}
                    </Button>
                  </div>
                </div>

                <div className="p-4 border border-destructive/50 rounded-lg space-y-3 bg-destructive/5">
                  <h4 className="font-medium text-destructive">
                    {t("Danger Zone")}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {t(
                      "Permanently delete your account and all associated data",
                    )}
                  </p>
                  <Button variant="destructive" size="sm">
                    {t("Delete Account")}
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
