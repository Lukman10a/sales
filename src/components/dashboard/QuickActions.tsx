import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { actions } from "@/data/data";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

const variantStyles = {
  primary: "bg-gradient-primary text-primary-foreground hover:opacity-90",
  accent:
    "bg-gradient-accent text-accent-foreground hover:opacity-90 glow-accent",
  secondary:
    "bg-card border border-border hover:border-accent/50 text-foreground",
};

const QuickActions = () => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      {actions.map((action, index) => (
        <Link key={action.id} href={action.href}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "p-4 rounded-xl transition-all duration-300 cursor-pointer",
              variantStyles[action.variant],
            )}
          >
            <action.icon className="w-6 h-6 mb-3" />
            <h4 className="font-semibold text-sm mb-1">{t(action.title)}</h4>
            <p
              className={cn(
                "text-xs",
                action.variant === "secondary"
                  ? "text-muted-foreground"
                  : "opacity-80",
              )}
            >
              {t(action.description)}
            </p>
          </motion.div>
        </Link>
      ))}
    </motion.div>
  );
};

export default QuickActions;
