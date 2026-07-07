import Image from "next/image";
import { Award, Calendar, ExternalLink, HelpCircle, Mic, Trophy } from "lucide-react";
import { formatFullDateTime } from "@/lib/format";
import type { EventDetail } from "@/types/event";

export function EventDescription({ event }: { event: EventDetail }) {
  if (!event.description) return null;
  return (
    <section>
      <h2 className="text-xl font-bold text-foreground">About this event</h2>
      <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-text-muted">{event.description}</p>
    </section>
  );
}

export function SessionsSection({ sessions }: { sessions: EventDetail["sessions"] }) {
  if (sessions.length === 0) return null;
  return (
    <section>
      <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
        <Calendar className="size-5 text-brand" />
        Schedule
      </h2>
      <div className="mt-4 space-y-3">
        {sessions.map((session) => (
          <div key={session.id} className="rounded-xl border border-border-subtle bg-surface-elevated p-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold text-foreground">{session.title}</h3>
              {session.has_awards ? <Trophy className="size-4 shrink-0 text-amber-500" /> : null}
            </div>
            <p className="mt-1 text-sm text-text-muted">{formatFullDateTime(session.starts_at)}</p>
            {session.venue_name ? <p className="text-sm text-text-muted">{session.venue_name}</p> : null}
            {session.description ? <p className="mt-2 text-sm text-text-muted">{session.description}</p> : null}
          </div>
        ))}
      </div>
    </section>
  );
}

export function SpeakersSection({ speakers }: { speakers: EventDetail["speakers"] }) {
  if (speakers.length === 0) return null;
  return (
    <section>
      <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
        <Mic className="size-5 text-brand" />
        Speakers
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {speakers.map((speaker) => (
          <div key={speaker.id} className="flex gap-3 rounded-xl border border-border-subtle bg-surface-elevated p-4">
            {speaker.photo_url ? (
              <Image
                src={speaker.photo_url}
                alt={speaker.name}
                width={48}
                height={48}
                className="size-12 shrink-0 rounded-full object-cover"
              />
            ) : (
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand/10 text-sm font-bold text-brand">
                {speaker.name.charAt(0)}
              </span>
            )}
            <div className="min-w-0">
              <p className="font-semibold text-foreground">{speaker.name}</p>
              {speaker.title ? <p className="text-xs text-text-muted">{speaker.title}</p> : null}
              {speaker.bio ? <p className="mt-1 line-clamp-2 text-sm text-text-muted">{speaker.bio}</p> : null}
              {speaker.linkedin_url ? (
                <a
                  href={speaker.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 flex items-center gap-1 text-xs text-brand hover:underline"
                >
                  Profile <ExternalLink className="size-3" />
                </a>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SponsorsSection({ sponsors }: { sponsors: EventDetail["sponsors"] }) {
  if (sponsors.length === 0) return null;
  return (
    <section>
      <h2 className="text-xl font-bold text-foreground">Sponsors</h2>
      <div className="mt-4 flex flex-wrap gap-4">
        {sponsors.map((sponsor) => {
          const inner = sponsor.logo_url ? (
            <Image src={sponsor.logo_url} alt={sponsor.name} width={96} height={48} className="max-h-12 w-auto object-contain" />
          ) : (
            <span className="text-sm font-semibold text-foreground">{sponsor.name}</span>
          );
          return (
            <div
              key={sponsor.id}
              className="flex h-16 min-w-32 items-center justify-center rounded-xl border border-border-subtle bg-surface-elevated px-5"
            >
              {sponsor.website_url ? (
                <a href={sponsor.website_url} target="_blank" rel="noopener noreferrer">
                  {inner}
                </a>
              ) : (
                inner
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function FAQSection({ faqs }: { faqs: EventDetail["faqs"] }) {
  if (faqs.length === 0) return null;
  return (
    <section>
      <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
        <HelpCircle className="size-5 text-brand" />
        Frequently asked questions
      </h2>
      <div className="mt-4 space-y-2">
        {faqs.map((faq) => (
          <details
            key={faq.id}
            className="group rounded-xl border border-border-subtle bg-surface-elevated p-4 open:shadow-soft"
          >
            <summary className="cursor-pointer list-none text-sm font-semibold text-foreground marker:content-none">
              {faq.question}
            </summary>
            <p className="mt-2 text-sm text-text-muted">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function AwardsSection({ awards }: { awards: EventDetail["awards"] }) {
  if (awards.length === 0) return null;
  return (
    <section>
      <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
        <Award className="size-5 text-brand" />
        Prizes & Awards
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {awards.map((award) => (
          <div key={award.id} className="flex items-center gap-3 rounded-xl border border-border-subtle bg-surface-elevated p-4">
            <Trophy className="size-5 shrink-0 text-amber-500" />
            <div>
              <p className="font-semibold text-foreground">{award.award_name}</p>
              {award.position_label ? <p className="text-xs text-text-muted">{award.position_label}</p> : null}
              {award.cash_amount ? (
                <p className="text-sm font-medium text-brand">
                  {award.currency} {Number(award.cash_amount).toLocaleString("en-IN")}
                </p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
