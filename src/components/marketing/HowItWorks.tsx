import { PartyPopper, Search, Smartphone } from "lucide-react";
import { AccentBar } from "@/components/marketing/AccentBar";
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/marketing/ScrollReveal";

const STEPS = [
  {
    icon: Search,
    title: "Find your thing",
    description: "Search by city, category, or keyword to discover events that match your interests.",
  },
  {
    icon: Smartphone,
    title: "RSVP in the app",
    description: "Reserve your spot or grab a ticket in seconds using the HappnCity mobile app.",
  },
  {
    icon: PartyPopper,
    title: "Show up & connect",
    description: "Meet people, learn something new, and make the most of what your city has to offer.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <ScrollReveal className="mb-10 text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">How HappnCity works</h2>
        <AccentBar className="mx-auto" />
        <p className="mt-2 text-text-muted">Three steps between you and your next great event.</p>
      </ScrollReveal>

      <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {STEPS.map((step, i) => (
          <StaggerItem key={step.title} className="relative">
            <div className="flex h-full flex-col items-center gap-4 rounded-2xl border border-border-subtle bg-surface-elevated p-8 text-center shadow-soft">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-primary-glow">
                <step.icon className="size-6" />
              </span>
              <span className="text-xs font-bold tracking-widest text-brand">STEP {i + 1}</span>
              <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="text-sm text-text-muted">{step.description}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
