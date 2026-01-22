"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Plus,
  Search,
  Filter,
  Users,
  Edit,
  Trash2,
  Mail,
  Phone,
  Calendar,
  Clock,
  Shield,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  TeamMember,
  TeamRole,
  TeamStatus,
  Permission,
} from "@/types/teamTypes";
import { toast } from "@/components/ui/sonner";
import {
  teamMembers as initialTeamMembers,
  activityLogs,
  rolePermissions,
  permissionDescriptions,
} from "@/data/team";

const statusConfig: Record<TeamStatus, { label: string; className: string }> = {
  active: {
    label: "Active",
    className: "bg-success/10 text-success border-success/20",
  },
  inactive: {
    label: "Inactive",
    className: "bg-muted text-muted-foreground border-muted",
  },
  invited: {
    label: "Invited",
    className: "bg-warning/10 text-warning border-warning/20",
  },
};

const roleConfig: Record<TeamRole, { label: string; color: string }> = {
  owner: { label: "Owner", color: "text-purple-600" },
  manager: { label: "Manager", color: "text-blue-600" },
  "sales-staff": { label: "Sales Staff", color: "text-green-600" },
  "inventory-staff": { label: "Inventory Staff", color: "text-orange-600" },
};

const emptyNewMember: Omit<TeamMember, "id" | "joinedDate"> = {
  name: "",
  email: "",
  phone: "",
  role: "sales-staff",
  status: "invited",
  permissions: [],
  department: "",
  avatar: "",
};

export default function TeamManagement() {
  const { t, isRTL } = useLanguage();
  const [teamMembers, setTeamMembers] =
    useState<TeamMember[]>(initialTeamMembers);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterRole, setFilterRole] = useState<string>("all");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<TeamMember | null>(null);
  const [newMember, setNewMember] =
    useState<Omit<TeamMember, "id" | "joinedDate">>(emptyNewMember);

  const filteredMembers = useMemo(() => {
    let members = teamMembers.filter(
      (member) =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    if (filterStatus !== "all")
      members = members.filter((m) => m.status === filterStatus);
    if (filterRole !== "all")
      members = members.filter((m) => m.role === filterRole);

    return members;
  }, [teamMembers, searchQuery, filterStatus, filterRole]);

  const handleAddMember = () => {
    if (!newMember.name.trim() || !newMember.email.trim()) {
      toast(t("Please fill in all required fields"));
      return;
    }

    const member: TeamMember = {
      ...newMember,
      id: `${Date.now()}`,
      joinedDate: new Date().toISOString().split("T")[0],
      permissions:
        newMember.permissions.length > 0
          ? newMember.permissions
          : rolePermissions[newMember.role],
    };

    setTeamMembers([...teamMembers, member]);
    setNewMember(emptyNewMember);
    setIsAddOpen(false);
    toast(t("Team member invited successfully"));
  };

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member);
  };

  const handleSaveEdit = () => {
    if (!editingMember) return;

    setTeamMembers(
      teamMembers.map((m) => (m.id === editingMember.id ? editingMember : m)),
    );
    setEditingMember(null);
    toast(t("Team member updated successfully"));
  };

  const handleDeleteMember = () => {
    if (!deleteTarget) return;

    setTeamMembers(teamMembers.filter((m) => m.id !== deleteTarget.id));
    toast(t("Team member removed successfully"));
    setDeleteTarget(null);
  };

  const handleRoleChange = (role: TeamRole, isEditing: boolean = false) => {
    const defaultPermissions = rolePermissions[role];
    if (isEditing && editingMember) {
      setEditingMember({
        ...editingMember,
        role,
        permissions: defaultPermissions,
      });
    } else {
      setNewMember({ ...newMember, role, permissions: defaultPermissions });
    }
  };

  const togglePermission = (
    permission: Permission,
    isEditing: boolean = false,
  ) => {
    if (isEditing && editingMember) {
      const hasPermission = editingMember.permissions.includes(permission);
      const newPermissions = hasPermission
        ? editingMember.permissions.filter((p) => p !== permission)
        : [...editingMember.permissions, permission];
      setEditingMember({ ...editingMember, permissions: newPermissions });
    } else {
      const hasPermission = newMember.permissions.includes(permission);
      const newPermissions = hasPermission
        ? newMember.permissions.filter((p) => p !== permission)
        : [...newMember.permissions, permission];
      setNewMember({ ...newMember, permissions: newPermissions });
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">
              {t("Team Management")}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              {t("Manage your team members and their permissions")}
            </p>
          </div>
          <Button
            onClick={() => setIsAddOpen(true)}
            className="bg-gradient-accent text-accent-foreground hover:opacity-90 glow-accent w-full sm:w-auto"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t("Invite Team Member")}
          </Button>
        </div>

        <Tabs defaultValue="members" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="members" className="gap-2">
              <Users className="w-4 h-4" />
              {t("Team Members")}
            </TabsTrigger>
            <TabsTrigger value="activity" className="gap-2">
              <Activity className="w-4 h-4" />
              {t("Activity Log")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="members" className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="relative flex-1">
                <Search
                  className={
                    isRTL
                      ? "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                      : "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                  }
                />
                <Input
                  placeholder={t("Search team members...")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={isRTL ? "pr-10" : "pl-10"}
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder={t("Status")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("All Status")}</SelectItem>
                  <SelectItem value="active">{t("Active")}</SelectItem>
                  <SelectItem value="inactive">{t("Inactive")}</SelectItem>
                  <SelectItem value="invited">{t("Invited")}</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder={t("Role")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("All Roles")}</SelectItem>
                  <SelectItem value="owner">{t("Owner")}</SelectItem>
                  <SelectItem value="manager">{t("Manager")}</SelectItem>
                  <SelectItem value="sales-staff">
                    {t("Sales Staff")}
                  </SelectItem>
                  <SelectItem value="inventory-staff">
                    {t("Inventory Staff")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-card rounded-xl border p-3 sm:p-4 card-elevated">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {t("Total Members")}
                </p>
                <p className="text-xl sm:text-2xl font-display font-bold text-foreground">
                  {teamMembers.length}
                </p>
              </div>
              <div className="bg-card rounded-xl border p-3 sm:p-4 card-elevated">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {t("Active")}
                </p>
                <p className="text-xl sm:text-2xl font-display font-bold text-success">
                  {teamMembers.filter((m) => m.status === "active").length}
                </p>
              </div>
              <div className="bg-card rounded-xl border p-3 sm:p-4 card-elevated">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {t("Invited")}
                </p>
                <p className="text-xl sm:text-2xl font-display font-bold text-warning">
                  {teamMembers.filter((m) => m.status === "invited").length}
                </p>
              </div>
              <div className="bg-card rounded-xl border p-3 sm:p-4 card-elevated">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {t("Inactive")}
                </p>
                <p className="text-xl sm:text-2xl font-display font-bold text-muted-foreground">
                  {teamMembers.filter((m) => m.status === "inactive").length}
                </p>
              </div>
            </div>

            {/* Team Members List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <AnimatePresence>
                {filteredMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-card rounded-2xl border card-elevated card-hover p-4"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>
                            {member.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {member.name}
                          </h3>
                          <p
                            className={cn(
                              "text-sm font-medium",
                              roleConfig[member.role].color,
                            )}
                          >
                            {t(roleConfig[member.role].label)}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={statusConfig[member.status].className}
                      >
                        {t(statusConfig[member.status].label)}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        <span className="truncate">{member.email}</span>
                      </div>
                      {member.phone && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="w-4 h-4" />
                          <span>{member.phone}</span>
                        </div>
                      )}
                      {member.department && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Shield className="w-4 h-4" />
                          <span>{member.department}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {t("Joined")}:{" "}
                          {new Date(member.joinedDate).toLocaleDateString()}
                        </span>
                      </div>
                      {member.lastActive && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>
                            {t("Last active")}:{" "}
                            {new Date(member.lastActive).toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 pt-3 border-t">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleEditMember(member)}
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        {t("Edit")}
                      </Button>
                      {member.role !== "owner" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => setDeleteTarget(member)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <div className="bg-card rounded-2xl border card-elevated overflow-hidden">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-foreground">
                  {t("Recent Activity")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("Track team member actions and changes")}
                </p>
              </div>
              <div className="divide-y">
                {activityLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-4 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">
                          {log.userName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {log.action} • {log.entity}
                        </p>
                        {log.details && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {log.details}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">
                          {new Date(log.timestamp).toLocaleString()}
                        </p>
                        {log.ipAddress && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {log.ipAddress}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Member Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t("Invite Team Member")}</DialogTitle>
            <DialogDescription>
              {t(
                "Send an invitation to join your team with specific role and permissions",
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">{t("Full Name")}*</Label>
                <Input
                  id="name"
                  placeholder={t("John Doe")}
                  value={newMember.name}
                  onChange={(e) =>
                    setNewMember({ ...newMember, name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">{t("Email")}*</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={newMember.email}
                  onChange={(e) =>
                    setNewMember({ ...newMember, email: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="phone">{t("Phone")}</Label>
                <Input
                  id="phone"
                  placeholder="+234 800 000 0000"
                  value={newMember.phone}
                  onChange={(e) =>
                    setNewMember({ ...newMember, phone: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="department">{t("Department")}</Label>
                <Input
                  id="department"
                  placeholder={t("Sales")}
                  value={newMember.department}
                  onChange={(e) =>
                    setNewMember({ ...newMember, department: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">{t("Role")}</Label>
              <Select
                value={newMember.role}
                onValueChange={(value) => handleRoleChange(value as TeamRole)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manager">{t("Manager")}</SelectItem>
                  <SelectItem value="sales-staff">
                    {t("Sales Staff")}
                  </SelectItem>
                  <SelectItem value="inventory-staff">
                    {t("Inventory Staff")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>{t("Permissions")}</Label>
              <div className="grid grid-cols-2 gap-3 p-4 border rounded-lg bg-muted/30">
                {(Object.keys(permissionDescriptions) as Permission[]).map(
                  (permission) => (
                    <div
                      key={permission}
                      className="flex items-start space-x-2"
                    >
                      <Checkbox
                        id={`perm-${permission}`}
                        checked={newMember.permissions.includes(permission)}
                        onCheckedChange={() => togglePermission(permission)}
                      />
                      <div className="grid gap-1">
                        <label
                          htmlFor={`perm-${permission}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {t(permission.replace(/-/g, " "))}
                        </label>
                        <p className="text-xs text-muted-foreground">
                          {permissionDescriptions[permission]}
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsAddOpen(false);
                setNewMember(emptyNewMember);
              }}
            >
              {t("Cancel")}
            </Button>
            <Button
              onClick={handleAddMember}
              disabled={!newMember.name.trim() || !newMember.email.trim()}
            >
              {t("Send Invitation")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Member Dialog */}
      <Dialog
        open={!!editingMember}
        onOpenChange={(open) => !open && setEditingMember(null)}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t("Edit Team Member")}</DialogTitle>
          </DialogHeader>
          {editingMember && (
            <div className="grid gap-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">{t("Full Name")}</Label>
                  <Input
                    id="edit-name"
                    value={editingMember.name}
                    onChange={(e) =>
                      setEditingMember({
                        ...editingMember,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-email">{t("Email")}</Label>
                  <Input
                    id="edit-email"
                    value={editingMember.email}
                    onChange={(e) =>
                      setEditingMember({
                        ...editingMember,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-phone">{t("Phone")}</Label>
                  <Input
                    id="edit-phone"
                    value={editingMember.phone || ""}
                    onChange={(e) =>
                      setEditingMember({
                        ...editingMember,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-department">{t("Department")}</Label>
                  <Input
                    id="edit-department"
                    value={editingMember.department || ""}
                    onChange={(e) =>
                      setEditingMember({
                        ...editingMember,
                        department: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-role">{t("Role")}</Label>
                  <Select
                    value={editingMember.role}
                    onValueChange={(value) =>
                      handleRoleChange(value as TeamRole, true)
                    }
                    disabled={editingMember.role === "owner"}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="owner">{t("Owner")}</SelectItem>
                      <SelectItem value="manager">{t("Manager")}</SelectItem>
                      <SelectItem value="sales-staff">
                        {t("Sales Staff")}
                      </SelectItem>
                      <SelectItem value="inventory-staff">
                        {t("Inventory Staff")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-status">{t("Status")}</Label>
                  <Select
                    value={editingMember.status}
                    onValueChange={(value) =>
                      setEditingMember({
                        ...editingMember,
                        status: value as TeamStatus,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">{t("Active")}</SelectItem>
                      <SelectItem value="inactive">{t("Inactive")}</SelectItem>
                      <SelectItem value="invited">{t("Invited")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label>{t("Permissions")}</Label>
                <div className="grid grid-cols-2 gap-3 p-4 border rounded-lg bg-muted/30">
                  {(Object.keys(permissionDescriptions) as Permission[]).map(
                    (permission) => (
                      <div
                        key={permission}
                        className="flex items-start space-x-2"
                      >
                        <Checkbox
                          id={`edit-perm-${permission}`}
                          checked={editingMember.permissions.includes(
                            permission,
                          )}
                          onCheckedChange={() =>
                            togglePermission(permission, true)
                          }
                        />
                        <div className="grid gap-1">
                          <label
                            htmlFor={`edit-perm-${permission}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {t(permission.replace(/-/g, " "))}
                          </label>
                          <p className="text-xs text-muted-foreground">
                            {permissionDescriptions[permission]}
                          </p>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingMember(null)}>
              {t("Cancel")}
            </Button>
            <Button onClick={handleSaveEdit}>{t("Save Changes")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("Remove Team Member")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t(
                "Are you sure you want to remove {name} from your team? This action cannot be undone.",
                {
                  values: { name: deleteTarget?.name || "" },
                },
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteTarget(null)}>
              {t("Cancel")}
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDeleteMember}
            >
              {t("Remove")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </MainLayout>
  );
}
