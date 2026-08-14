import Link from "next/link";
import Image from "next/image";
import { Compass } from "lucide-react";
import logo from "@/app/logo.jpeg";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden bg-background py-20">
      <div
        aria-hidden
        className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black_80%)]"
      />
      <div className="relative mx-auto max-w-xl px-4 text-center sm:px-6">
        <Image src={logo} alt="HappnCity" className="mx-auto size-14 rounded-2xl shadow-primary-glow" priority />

        <span className="mt-8 inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-surface-elevated px-3 py-1 text-xs font-medium text-text-muted shadow-soft">
          <Compass className="size-3.5" />
          404 — nothing here
        </span>

        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
          This page{" "}
          <span className="bg-gradient-brand bg-clip-text text-transparent">isn&apos;t happening</span>
        </h1>

        <p className="mx-auto mt-5 max-w-md text-lg text-text-muted text-balance">
          Be Where It Happens — just not at this address. The page you&apos;re looking for doesn&apos;t exist or
          may have moved.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-primary-glow transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            Back to Home
          </Link>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-elevated px-6 py-3 text-sm font-semibold text-text-muted transition-colors hover:border-brand/30 hover:text-brand"
          >
            Explore Events
          </Link>
        </div>
      </div>
    </section>
  );
}
