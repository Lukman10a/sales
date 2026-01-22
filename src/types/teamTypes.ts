export type TeamRole = "owner" | "manager" | "sales-staff" | "inventory-staff";
export type TeamStatus = "active" | "inactive" | "invited";
export type Permission = 
  | "view-dashboard" 
  | "manage-inventory" 
  | "record-sales" 
  | "view-analytics" 
  | "manage-team" 
  | "view-reports"
  | "export-data"
  | "manage-settings";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: TeamRole;
  status: TeamStatus;
  permissions: Permission[];
  avatar?: string;
  joinedDate: string;
  lastActive?: string;
  department?: string;
  invitedBy?: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entity: string;
  entityId?: string;
  timestamp: string;
  details?: string;
  ipAddress?: string;
}
