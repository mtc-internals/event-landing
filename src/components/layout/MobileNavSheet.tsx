"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AppRedirectDialog } from "@/components/shared/AppRedirectDialog";
// The organiser dashboard (event/frontend) isn't deployed yet, so "For
// Organizers" doesn't redirect there for now. Restore once it's live:
// import { ORGANISER_APP_URL } from "@/lib/env";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Explore Events" },
];

export function MobileNavSheet() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" />}>
        <Menu className="size-5" />
        <span className="sr-only">Open menu</span>
      </SheetTrigger>
      <SheetContent side="right" className="w-3/4">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4">
          {NAV_LINKS.map((link) => (
            <SheetClose
              key={link.href}
              render={
                <Link
                  href={link.href}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
                />
              }
            >
              {link.label}
            </SheetClose>
          ))}
          <span
            aria-disabled
            className="flex cursor-not-allowed items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-medium text-text-faint"
          >
            For Organizers
            <span className="rounded-full bg-muted px-1.5 py-0.5 text-[0.65rem] font-semibold text-text-muted">
              Soon
            </span>
          </span>
        </nav>
        <div className="mt-auto p-4">
          <AppRedirectDialog trigger={<Button className="w-full">Get the App</Button>} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
