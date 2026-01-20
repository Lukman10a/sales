export const dynamic = "force-dynamic";

import { useState } from "react";
import { motion } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Bell,
  Shield,
  Palette,
  Database,
  HelpCircle,
  Users,
  ChevronRight,
  Upload,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const settingSections = [
  {
    id: "profile",
    title: "Profile Settings",
    description: "Manage your account information",
    icon: User,
  },
  {
    id: "notifications",
    title: "Notifications",
    description: "Configure alert preferences",
    icon: Bell,
  },
  {
    id: "security",
    title: "Security",
    description: "Password and authentication",
    icon: Shield,
  },
  {
    id: "appearance",
    title: "Appearance",
    description: "Customize the app look",
    icon: Palette,
  },
  {
    id: "data",
    title: "Data & Backup",
    description: "Export and backup options",
    icon: Database,
  },
  {
    id: "help",
    title: "Help & Support",
    description: "Get help and documentation",
    icon: HelpCircle,
  },
  {
    id: "staff",
    title: "Staff & Invitations",
    description: "Invite and manage your staff",
    icon: Users,
  },
];

type StaffMember = {
  id: string;
  name: string;
  email: string;
  role: "admin";
  status: "active" | "invited";
};

const Settings = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const { user } = useAuth();
  const userRole = user?.role || "owner";
  const [profileImage, setProfileImage] = useState(user?.avatar || "");
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return localStorage.getItem("luxa_theme") || "dark";
  });
  const [staff, setStaff] = useState<StaffMember[]>([
    {
      id: "1",
      name: "Ibrahim Musa",
      email: "ibrahim@luxa.com",
      role: "admin",
      status: "active",
    },
    {
      id: "2",
      name: "Salim Adeyemi",
      email: "salim@luxa.com",
      role: "admin",
      status: "invited",
    },
  ]);
  const [newStaffName, setNewStaffName] = useState("");
  const [newStaffEmail, setNewStaffEmail] = useState("");
  const [inviteError, setInviteError] = useState("");
  const { t, language, toggleLanguage } = useLanguage();

  const handleInviteStaff = () => {
    if (userRole !== "owner") return;

    if (!newStaffName.trim() || !newStaffEmail.trim()) {
      setInviteError(t("Name and email are required"));
      return;
    }

    if (!newStaffEmail.includes("@")) {
      setInviteError(t("Enter a valid email"));
      return;
    }

    const newMember: StaffMember = {
      id: `${Date.now()}`,
      name: newStaffName.trim(),
      email: newStaffEmail.trim(),
      role: "admin",
      status: "invited",
    };

    setStaff([...staff, newMember]);
    setInviteError("");
    setNewStaffName("");
    setNewStaffEmail("");
  };

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string;
        setProfileImage(imageData);
        // In a real app, this would be saved to backend
      };
      reader.readAsDataURL(file);
    }
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("luxa_theme", newTheme);
  };

  const userDisplayName = user ? `${user.firstName} ${user.lastName}` : "User";
  const userInitials = user ? `${user.firstName[0]}${user.lastName[0]}` : "U";

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            {t("Settings")}
          </h1>
          <p className="text-muted-foreground">
            {t("Manage your account and preferences")}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {settingSections
                .filter(
                  (s) =>
                    userRole === "owner" ||
                    !["staff", "data", "help"].includes(s.id),
                )
                .map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left",
                      activeSection === section.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <section.icon className="w-5 h-5" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{t(section.title)}</p>
                    </div>
                    <ChevronRight
                      className={cn(
                        "w-4 h-4",
                        activeSection === section.id &&
                          "text-primary-foreground",
                      )}
                    />
                  </button>
                ))}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-card rounded-2xl border card-elevated p-6"
            >
              {activeSection === "profile" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display font-semibold text-xl text-foreground mb-1">
                      {t("Profile Settings")}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {t("Update your personal information")}
                    </p>
                  </div>
                  <Separator />
                  {/* Profile Picture */}
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-foreground mb-3">
                        {t("Profile Picture")}
                      </p>
                      <div className="flex items-center gap-6">
                        <Avatar className="w-20 h-20 border-2 border-accent/30">
                          <AvatarImage src={profileImage || ""} />
                          <AvatarFallback className="bg-gradient-accent text-accent-foreground font-bold text-xl">
                            {userInitials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleProfileImageUpload}
                            className="hidden"
                            id="profileImageInput"
                          />
                          <label
                            htmlFor="profileImageInput"
                            className="cursor-pointer"
                          >
                            <div className="bg-gradient-accent text-accent-foreground mb-2 inline-flex px-4 py-2 rounded-md font-medium text-sm">
                              <Upload className="w-4 h-4 mr-2" />
                              {t("Change Photo")}
                            </div>
                          </label>
                          <p className="text-xs text-muted-foreground">
                            {t("JPG, PNG or GIF (max 2MB)")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid gap-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">{t("First Name")}</Label>
                        <Input
                          id="firstName"
                          defaultValue={user?.firstName ?? ""}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">{t("Last Name")}</Label>
                        <Input
                          id="lastName"
                          defaultValue={user?.lastName ?? ""}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t("Email")}</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue={user?.email ?? ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t("Phone Number")}</Label>
                      <Input id="phone" defaultValue="+234 801 234 5678" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="business">{t("Business Name")}</Label>
                      <Input
                        id="business"
                        defaultValue="Hassan Electronics"
                        disabled={userRole === "apprentice"}
                      />
                    </div>
                    <Button className="w-fit bg-gradient-accent text-accent-foreground">
                      {t("Save Changes")}
                    </Button>
                  </div>
                </div>
              )}

              {activeSection === "appearance" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display font-semibold text-xl text-foreground mb-1">
                      {t("Appearance Settings")}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {t("Customize the app appearance and theme")}
                    </p>
                  </div>
                  <Separator />
                  <div className="space-y-8">
                    {/* Theme Selection */}
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium text-foreground mb-4">
                          {t("Theme")}
                        </p>
                        <div className="grid grid-cols-3 gap-4">
                          {[
                            { id: "light", name: t("Light") },
                            { id: "dark", name: t("Dark") },
                            { id: "auto", name: t("Auto") },
                          ].map((themeOption) => (
                            <button
                              key={themeOption.id}
                              onClick={() => handleThemeChange(themeOption.id)}
                              className={cn(
                                "p-4 rounded-xl border-2 transition-all",
                                theme === themeOption.id
                                  ? "border-accent bg-accent/10"
                                  : "border-border hover:border-accent/50",
                              )}
                            >
                              <div className="flex items-center justify-center mb-2">
                                {themeOption.id === "light" && (
                                  <div className="w-8 h-8 rounded bg-white border border-gray-300" />
                                )}
                                {themeOption.id === "dark" && (
                                  <div className="w-8 h-8 rounded bg-gray-900 border border-gray-700" />
                                )}
                                {themeOption.id === "auto" && (
                                  <div className="w-8 h-8 rounded bg-gradient-to-r from-white to-gray-900 border border-gray-400" />
                                )}
                              </div>
                              <p className="text-sm font-medium">
                                {themeOption.name}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Language Selection */}
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium text-foreground mb-4">
                          {t("Language")}
                        </p>
                        <div className="flex gap-4">
                          <Button
                            variant={language === "en" ? "default" : "outline"}
                            className="flex-1"
                            onClick={() => {
                              if (language !== "en") toggleLanguage();
                            }}
                          >
                            English
                          </Button>
                          <Button
                            variant={language === "ar" ? "default" : "outline"}
                            className="flex-1"
                            onClick={() => {
                              if (language !== "ar") toggleLanguage();
                            }}
                          >
                            العربية
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "notifications" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display font-semibold text-xl text-foreground mb-1">
                      {t("Notification Preferences")}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {t("Choose what notifications you receive")}
                    </p>
                  </div>
                  <Separator />
                  <div className="space-y-6">
                    {userRole === "investor" ? (
                      <>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">
                              {t("Profit Updates")}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {t("Get notified about your monthly earnings")}
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">
                              {t("Withdrawal Status")}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {t("Updates on your withdrawal requests")}
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">
                              {t("AI Insights")}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {t("Investment recommendations and analysis")}
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">
                              {t("Business Updates")}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {t("Important business announcements")}
                            </p>
                          </div>
                          <Switch />
                        </div>
                      </>
                    ) : userRole === "apprentice" ? (
                      <>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">
                              {t("Product Additions")}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {t("Owner added new items to sell")}
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">
                              {t("Price Updates")}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {t("Pricing changes for products")}
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">
                              {t("Stock Discrepancies")}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {t("Alerts for inventory mismatches")}
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">
                              {t("Sales Targets")}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {t("Your weekly sales performance")}
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">
                              {t("Sales Alerts")}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {t("Get notified when a sale is recorded")}
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">
                              {t("Low Stock Warnings")}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {t("Alert when items are running low")}
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">
                              {t("Discrepancy Alerts")}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {t("Immediate alert for stock mismatches")}
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">
                              {t("AI Insights")}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {t("Receive smart business recommendations")}
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">
                              {t("Daily Summary")}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {t("End of day sales summary")}
                            </p>
                          </div>
                          <Switch />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {activeSection === "security" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display font-semibold text-xl text-foreground mb-1">
                      {t("Security Settings")}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {t("Manage your password and security options")}
                    </p>
                  </div>
                  <Separator />
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">
                        {t("Current Password")}
                      </Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">{t("New Password")}</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">
                        {t("Confirm Password")}
                      </Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <Button className="w-fit bg-gradient-accent text-accent-foreground">
                      {t("Update Password")}
                    </Button>
                  </div>
                </div>
              )}

              {activeSection === "staff" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display font-semibold text-xl text-foreground mb-1">
                      {t("Staff & Invitations")}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {t("Invite team members to help manage your store")}
                    </p>
                  </div>
                  <Separator />

                  <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
                    <div className="space-y-4 bg-muted/40 border rounded-2xl p-4">
                      <div className="space-y-2">
                        <Label htmlFor="staffName">{t("Full Name")}</Label>
                        <Input
                          id="staffName"
                          placeholder={t("Enter full name")}
                          value={newStaffName}
                          onChange={(e) => setNewStaffName(e.target.value)}
                          disabled={userRole !== "owner"}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="staffEmail">{t("Email")}</Label>
                        <Input
                          id="staffEmail"
                          type="email"
                          placeholder="name@business.com"
                          value={newStaffEmail}
                          onChange={(e) => setNewStaffEmail(e.target.value)}
                          disabled={userRole !== "owner"}
                        />
                      </div>
                      {inviteError && (
                        <p className="text-sm text-destructive">
                          {inviteError}
                        </p>
                      )}
                      <Button
                        className="bg-gradient-accent text-accent-foreground"
                        onClick={handleInviteStaff}
                        disabled={userRole !== "owner"}
                      >
                        {t("Send Invite")}
                      </Button>
                      {userRole !== "owner" && (
                        <p className="text-xs text-muted-foreground">
                          {t(
                            "Only owners can invite staff. Contact your owner to get access.",
                          )}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      {staff.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center justify-between p-4 border rounded-xl bg-card"
                        >
                          <div>
                            <p className="font-medium text-foreground">
                              {member.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {member.email}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={
                                member.status === "active"
                                  ? "bg-success/10 text-success border-success/30"
                                  : "bg-warning/10 text-warning border-warning/30"
                              }
                            >
                              {member.status === "active"
                                ? t("Active")
                                : t("Invited")}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {t("Admin")}
                            </Badge>
                          </div>
                        </div>
                      ))}

                      {staff.length === 0 && (
                        <div className="p-4 border rounded-xl bg-muted/40 text-sm text-muted-foreground">
                          {t(
                            "No staff members yet. Invite your first admin to get started.",
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {(activeSection === "data" || activeSection === "help") && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    {t("This section will be available soon.")}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
