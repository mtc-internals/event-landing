import {
  Briefcase,
  Cpu,
  Gamepad2,
  GraduationCap,
  HeartPulse,
  Landmark,
  Music,
  Palette,
  Sparkles,
  Trophy,
  UtensilsCrossed,
  Users,
  type LucideIcon,
} from "lucide-react";

/**
 * NOTE: these codes belong to the `events.category` free-text column
 * (what GET /events/categories and the `category` filter on GET /events
 * actually use) — this is a *different* system from the unused
 * `event_categories` lookup table in the DB, which has its own
 * (technology/business/arts_culture/...) codes and no live consumers here.
 */
export interface CategoryMeta {
  code: string;
  label: string;
  icon: LucideIcon;
  color: string;
}

export const CATEGORY_META: Record<string, CategoryMeta> = {
  tech: { code: "tech", label: "Technology", icon: Cpu, color: "#5C3BFE" },
  education: { code: "education", label: "Education", icon: GraduationCap, color: "#0095FF" },
  culture: { code: "culture", label: "Culture & Heritage", icon: Landmark, color: "#FFAB00" },
  sports: { code: "sports", label: "Sports & Fitness", icon: Trophy, color: "#00C48C" },
  music: { code: "music", label: "Music & Performing Arts", icon: Music, color: "#EC4899" },
  business: { code: "business", label: "Business & Finance", icon: Briefcase, color: "#6366F1" },
  health: { code: "health", label: "Health & Wellness", icon: HeartPulse, color: "#FF5757" },
  social: { code: "social", label: "Social & Community", icon: Users, color: "#14B8A6" },
  arts: { code: "arts", label: "Arts & Crafts", icon: Palette, color: "#F97316" },
  food: { code: "food", label: "Food & Drinks", icon: UtensilsCrossed, color: "#F59E0B" },
  career: { code: "career", label: "Career & Jobs", icon: Briefcase, color: "#3D22D4" },
  gaming: { code: "gaming", label: "Gaming", icon: Gamepad2, color: "#8B5CF6" },
  other: { code: "other", label: "Other", icon: Sparkles, color: "#6B7280" },
};

export const CATEGORY_ORDER = [
  "tech",
  "business",
  "music",
  "sports",
  "education",
  "culture",
  "health",
  "food",
  "arts",
  "social",
  "career",
  "gaming",
  "other",
];

export function getCategoryMeta(code: string): CategoryMeta {
  return CATEGORY_META[code] ?? { code, label: code, icon: Sparkles, color: "#6B7280" };
}
