// Mock Authentication Service
// In production, this would connect to a real backend API

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "owner" | "apprentice";
  businessName: string;
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  role: "owner" | "apprentice";
}

// Mock users database
const MOCK_USERS: Record<string, { password: string; user: User }> = {
  "ahmed@luxa.com": {
    password: "admin123",
    user: {
      id: "1",
      email: "ahmed@luxa.com",
      firstName: "Ahmed",
      lastName: "Hassan",
      role: "owner",
      businessName: "Hassan Electronics",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
  },
  "ibrahim@luxa.com": {
    password: "staff123",
    user: {
      id: "2",
      email: "ibrahim@luxa.com",
      firstName: "Ibrahim",
      lastName: "Musa",
      role: "apprentice",
      businessName: "Hassan Electronics",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
  },
};

const AUTH_STORAGE_KEY = "luxa_auth_user";
const ROLE_STORAGE_KEY = "luxa_last_role";

export class AuthService {
  // Login user
  static async login(credentials: LoginCredentials): Promise<User> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const userRecord = MOCK_USERS[credentials.email];

    if (!userRecord) {
      throw new Error("Invalid email or password");
    }

    if (userRecord.password !== credentials.password) {
      throw new Error("Invalid email or password");
    }

    // Check if user has permission for the selected role
    if (userRecord.user.role !== credentials.role) {
      throw new Error(`You don't have ${credentials.role} access`);
    }

    // Store user in localStorage
    this.setUser(userRecord.user);
    this.setLastRole(credentials.role);

    return userRecord.user;
  }

  // Logout user
  static logout(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    // Keep last role for convenience
  }

  // Get current user
  static getUser(): User | null {
    if (typeof window === "undefined") return null;
    
    const userJson = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!userJson) return null;

    try {
      return JSON.parse(userJson);
    } catch {
      return null;
    }
  }

  // Set current user
  static setUser(user: User): void {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    return this.getUser() !== null;
  }

  // Get last selected role
  static getLastRole(): "owner" | "apprentice" {
    if (typeof window === "undefined") return "owner";
    return (localStorage.getItem(ROLE_STORAGE_KEY) as "owner" | "apprentice") || "owner";
  }

  // Set last selected role
  static setLastRole(role: "owner" | "apprentice"): void {
    localStorage.setItem(ROLE_STORAGE_KEY, role);
  }

  // Check if user has specific role
  static hasRole(role: "owner" | "apprentice"): boolean {
    const user = this.getUser();
    return user?.role === role;
  }

  // Get user display name
  static getUserDisplayName(): string {
    const user = this.getUser();
    return user ? `${user.firstName} ${user.lastName}` : "";
  }
}
