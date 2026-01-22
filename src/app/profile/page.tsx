"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import { useLanguage } from "@/contexts/LanguageContext";
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
  const { t } = useLanguage();
  const [profile, setProfile] = useState(userProfile);
  const [notifications, setNotifications] = useState(notificationPreferences);
  const [appearance, setAppearance] = useState(appearanceSettings);

  const handleSaveProfile = () => {
    toast(t("Profile updated successfully"));
  };

  const handleSaveNotifications = () => {
    toast(t("Notification preferences saved"));
  };

  const handleSaveAppearance = () => {
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
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="theme">{t("Theme")}</Label>
                    <Select
                      value={appearance.theme}
                      onValueChange={(value) =>
                        setAppearance({ ...appearance, theme: value as any })
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
                        <SelectItem value="fr">Français</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="currency">{t("Currency")}</Label>
                    <Select
                      value={appearance.currency}
                      onValueChange={(value) =>
                        setAppearance({ ...appearance, currency: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NGN">
                          ₦ Nigerian Naira (NGN)
                        </SelectItem>
                        <SelectItem value="USD">$ US Dollar (USD)</SelectItem>
                        <SelectItem value="EUR">€ Euro (EUR)</SelectItem>
                        <SelectItem value="GBP">
                          £ British Pound (GBP)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="date-format">{t("Date Format")}</Label>
                    <Select
                      value={appearance.dateFormat}
                      onValueChange={(value) =>
                        setAppearance({ ...appearance, dateFormat: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="time-format">{t("Time Format")}</Label>
                    <Select
                      value={appearance.timeFormat}
                      onValueChange={(value) =>
                        setAppearance({
                          ...appearance,
                          timeFormat: value as any,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12h">12-hour</SelectItem>
                        <SelectItem value="24h">24-hour</SelectItem>
                      </SelectContent>
                    </Select>
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
