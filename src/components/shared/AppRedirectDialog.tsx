"use client";

import type { ReactElement } from "react";
import { Apple, PlayCircle, Smartphone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// Not on the App Store / Play Store yet, so these buttons are disabled
// placeholders for now. Restore the real links once published:
// import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/app-links";

interface AppRedirectDialogProps {
  trigger: ReactElement;
  eventTitle?: string;
}

export function AppRedirectDialog({ trigger, eventTitle }: AppRedirectDialogProps) {
  return (
    <Dialog>
      <DialogTrigger render={trigger} />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-primary-glow">
            <Smartphone className="size-7" />
          </div>
          <DialogTitle className="text-center text-lg">
            Continue in the HappnCity app
          </DialogTitle>
          <DialogDescription className="text-center text-balance">
            {eventTitle
              ? `RSVPs and tickets for "${eventTitle}" will be handled in the HappnCity app.`
              : "Registering, RSVPs, and tickets will be handled in the HappnCity mobile app."}{" "}
            We&apos;re putting the finishing touches on it — it&apos;ll be live on the App Store and Google
            Play soon.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 sm:flex-row">
          <span
            aria-disabled
            className="flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-border-subtle bg-surface-elevated px-4 py-2.5 text-sm font-medium text-text-faint"
          >
            <Apple className="size-4" />
            Coming soon
          </span>
          <span
            aria-disabled
            className="flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-border-subtle bg-surface-elevated px-4 py-2.5 text-sm font-medium text-text-faint"
          >
            <PlayCircle className="size-4" />
            Coming soon
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
