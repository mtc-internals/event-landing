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
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/app-links";

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
            Continue in the Evento app
          </DialogTitle>
          <DialogDescription className="text-center text-balance">
            {eventTitle
              ? `RSVPs and tickets for "${eventTitle}" are handled in the Evento app.`
              : "Registering, RSVPs, and tickets are handled in the Evento mobile app."}{" "}
            Download it to get going — it only takes a minute.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 sm:flex-row">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border-subtle bg-surface-elevated px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            <Apple className="size-4" />
            App Store
          </a>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border-subtle bg-surface-elevated px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            <PlayCircle className="size-4" />
            Google Play
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
