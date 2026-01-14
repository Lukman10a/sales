"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthService } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RoleToggle } from "./RoleToggle";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail, Lock, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"owner" | "apprentice">(
    AuthService.getLastRole()
  );
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login({ email, password, role });
    } catch (err) {
      const fallback = t("Login failed. Please try again.");
      if (err instanceof Error) {
        setError(t(err.message, { fallback }));
      } else {
        setError(fallback);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Error Alert */}
      {error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email">{t("Email")}</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder={t("Enter your email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <Label htmlFor="password">{t("Password")}</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="password"
            type="password"
            placeholder={t("Enter your password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Role Toggle */}
      <RoleToggle value={role} onChange={setRole} />

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            disabled={isLoading}
          />
          <label
            htmlFor="remember"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
          >
              {t("Remember me")}
          </label>
        </div>
        <a
          href="#"
          className="text-sm font-medium text-accent hover:underline"
          onClick={(e) => e.preventDefault()}
        >
            {t("Forgot password?")}
        </a>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-gradient-accent text-accent-foreground hover:opacity-90 glow-accent h-11"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            {t("Signing in...")}
          </>
        ) : (
          t("Sign In")
        )}
      </Button>

      {/* Demo Credentials */}
      <div className="mt-6 p-4 bg-muted/50 rounded-xl border border-border">
        <p className="text-xs font-medium text-muted-foreground mb-2">
          {t("Demo Credentials:")}
        </p>
        <div className="space-y-1 text-xs text-muted-foreground">
          <p>
            <span className="font-medium">{t("Owner:")}</span> ahmed@luxa.com /
            admin123
          </p>
          <p>
            <span className="font-medium">{t("Admin:")}</span> ibrahim@luxa.com /
            staff123
          </p>
        </div>
      </div>
    </motion.form>
  );
}
