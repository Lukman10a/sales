"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthService, User, LoginCredentials } from "@/lib/auth";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check for existing session on mount
  useEffect(() => {
    const currentUser = AuthService.getUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const user = await AuthService.login(credentials);
    setUser(user);

    // Redirect based on user role
    if (user.role === "investor") {
      router.push("/investor-dashboard");
    } else {
      router.push("/dashboard");
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    router.push("/auth/login");
  };

  const updateUser = (updates: Partial<User>) => {
    try {
      const updatedUser = AuthService.updateUser(updates);
      setUser(updatedUser);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const value = React.useMemo(
    () => ({
      user,
      login,
      logout,
      updateUser,
      isAuthenticated: !!user,
      isLoading,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
