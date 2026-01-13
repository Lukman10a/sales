import { useState } from "react";
import { motion } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Bell,
  Shield,
  Palette,
  Database,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
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
];

const Settings = () => {
  const [userRole, setUserRole] = useState<"owner" | "apprentice">("owner");
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <MainLayout userRole={userRole} onRoleChange={setUserRole}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {settingSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left",
                    activeSection === section.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <section.icon className="w-5 h-5" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{section.title}</p>
                  </div>
                  <ChevronRight
                    className={cn(
                      "w-4 h-4",
                      activeSection === section.id && "text-primary-foreground"
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
                      Profile Settings
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Update your personal information
                    </p>
                  </div>
                  <Separator />
                  <div className="grid gap-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          defaultValue={userRole === "owner" ? "Ahmed" : "Ibrahim"}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          defaultValue={userRole === "owner" ? "Hassan" : "Musa"}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue={
                          userRole === "owner"
                            ? "ahmed@stockflow.com"
                            : "ibrahim@stockflow.com"
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        defaultValue="+234 801 234 5678"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="business">Business Name</Label>
                      <Input
                        id="business"
                        defaultValue="Hassan Electronics"
                        disabled={userRole === "apprentice"}
                      />
                    </div>
                    <Button className="w-fit bg-gradient-accent text-accent-foreground">
                      Save Changes
                    </Button>
                  </div>
                </div>
              )}

              {activeSection === "notifications" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display font-semibold text-xl text-foreground mb-1">
                      Notification Preferences
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Choose what notifications you receive
                    </p>
                  </div>
                  <Separator />
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Sales Alerts</p>
                        <p className="text-sm text-muted-foreground">
                          Get notified when a sale is recorded
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Low Stock Warnings</p>
                        <p className="text-sm text-muted-foreground">
                          Alert when items are running low
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Discrepancy Alerts</p>
                        <p className="text-sm text-muted-foreground">
                          Immediate alert for stock mismatches
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">AI Insights</p>
                        <p className="text-sm text-muted-foreground">
                          Receive smart business recommendations
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Daily Summary</p>
                        <p className="text-sm text-muted-foreground">
                          End of day sales summary
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "security" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display font-semibold text-xl text-foreground mb-1">
                      Security Settings
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Manage your password and security options
                    </p>
                  </div>
                  <Separator />
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <Button className="w-fit bg-gradient-accent text-accent-foreground">
                      Update Password
                    </Button>
                  </div>
                </div>
              )}

              {(activeSection === "appearance" ||
                activeSection === "data" ||
                activeSection === "help") && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    This section will be available soon.
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
