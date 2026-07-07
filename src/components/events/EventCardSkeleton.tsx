import { Skeleton } from "@/components/ui/skeleton";

export function EventCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface-elevated">
      <Skeleton className="aspect-16/10 w-full rounded-none" />
      <div className="flex flex-col gap-2 p-4">
        <Skeleton className="h-3.5 w-20" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="mt-2 flex items-center justify-between">
          <Skeleton className="h-3.5 w-24" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
      </div>
    </div>
  );
}
