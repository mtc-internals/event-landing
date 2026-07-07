import { cn } from "@/lib/utils";

/** Short gradient underline that grows in below section headings. */
export function AccentBar({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("animate-grow-x mt-2.5 block h-1 w-14 rounded-full bg-gradient-brand", className)}
    />
  );
}
