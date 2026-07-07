import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppRedirectDialog } from "@/components/shared/AppRedirectDialog";
import { MobileNavSheet } from "@/components/layout/MobileNavSheet";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { ORGANISER_APP_URL } from "@/lib/env";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md">
      <div
        aria-hidden
        className="animate-shimmer absolute inset-x-0 bottom-0 h-px opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent, var(--border-subtle) 20%, var(--brand) 50%, var(--border-subtle) 80%, transparent)",
        }}
      />
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-primary-glow">
            <Sparkles className="size-4" />
          </span>
          <span className="text-lg font-bold tracking-tight">Evento</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="/events"
            className="rounded-lg px-3 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-muted hover:text-foreground"
          >
            Explore Events
          </Link>
          <a
            href={ORGANISER_APP_URL}
            className="rounded-lg px-3 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-muted hover:text-foreground"
          >
            For Organizers
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden md:block">
            <AppRedirectDialog trigger={<Button>Get the App</Button>} />
          </div>
          <MobileNavSheet />
        </div>
      </div>
    </header>
  );
}
