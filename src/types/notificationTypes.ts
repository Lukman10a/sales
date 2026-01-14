export interface Notification {
  id: string;
  type: "inventory" | "sale" | "alert" | "ai";
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionable?: boolean;
}