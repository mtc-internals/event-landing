import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buildEventsHref, type EventsSearchParams } from "@/lib/query";
import type { Pagination as PaginationData } from "@/types/event";
import { cn } from "@/lib/utils";

export function Pagination({
  pagination,
  current,
}: {
  pagination: PaginationData;
  current: EventsSearchParams;
}) {
  if (pagination.total_pages <= 1) return null;

  const pages = Array.from({ length: pagination.total_pages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === pagination.total_pages || Math.abs(p - pagination.page) <= 1
  );

  return (
    <nav className="mt-10 flex items-center justify-center gap-1.5" aria-label="Pagination">
      <Link
        href={buildEventsHref(current, { page: String(Math.max(1, pagination.page - 1)) })}
        aria-disabled={pagination.page === 1}
        className={cn(
          "flex size-9 items-center justify-center rounded-lg border border-border-subtle bg-surface-elevated transition-colors hover:border-brand/30 hover:text-brand",
          pagination.page === 1 && "pointer-events-none opacity-40"
        )}
      >
        <ChevronLeft className="size-4" />
      </Link>

      {pages.map((p, i) => {
        const prev = pages[i - 1];
        const showEllipsis = prev !== undefined && p - prev > 1;
        return (
          <span key={p} className="flex items-center gap-1.5">
            {showEllipsis ? <span className="px-1 text-text-faint">…</span> : null}
            <Link
              href={buildEventsHref(current, { page: String(p) })}
              className={cn(
                "flex size-9 items-center justify-center rounded-lg border text-sm font-medium transition-colors",
                p === pagination.page
                  ? "border-brand bg-brand text-white"
                  : "border-border-subtle bg-surface-elevated text-text-muted hover:border-brand/30 hover:text-brand"
              )}
            >
              {p}
            </Link>
          </span>
        );
      })}

      <Link
        href={buildEventsHref(current, { page: String(Math.min(pagination.total_pages, pagination.page + 1)) })}
        aria-disabled={!pagination.has_more}
        className={cn(
          "flex size-9 items-center justify-center rounded-lg border border-border-subtle bg-surface-elevated transition-colors hover:border-brand/30 hover:text-brand",
          !pagination.has_more && "pointer-events-none opacity-40"
        )}
      >
        <ChevronRight className="size-4" />
      </Link>
    </nav>
  );
}
