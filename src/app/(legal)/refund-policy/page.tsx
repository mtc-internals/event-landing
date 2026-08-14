import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description: "Refund and Cancellation Policy for events booked through HappnCity.",
};

const SECTIONS = [
  {
    title: "1. Overview",
    body: `HappnCity (operated by Modern Tech Creations) is a platform that connects attendees with event organisers ("Organisations"). For paid events, HappnCity facilitates ticketing and payment collection on behalf of the Organisation, but the Organisation sets its own cancellation and refund terms for its events. This policy explains how refunds generally work on HappnCity and your rights under Indian law.`,
  },
  {
    title: "2. Organisation-Specific Refund Terms",
    body: `Each event page displays the cancellation and refund policy set by the organising Organisation. Please review it before registering. Where an Organisation has not specified a policy, tickets are treated as non-refundable except as described below or as required by applicable law.`,
  },
  {
    title: "3. Event Cancelled or Postponed by the Organiser",
    body: `If an Organisation cancels an event outright, registered attendees are entitled to a full refund of the ticket amount paid. If an event is postponed, your registration is automatically carried over to the new date unless you request a refund within the window specified on the event page (or within 7 days of the postponement notice if none is specified).`,
  },
  {
    title: "4. Cancellation by the Attendee",
    body: `If you cancel your own registration, refund eligibility depends on the Organisation's stated policy and how close to the event date you cancel. Convenience or platform fees charged by HappnCity at checkout are non-refundable, except where the cancellation is due to an error on our part.`,
  },
  {
    title: "5. Failed or Duplicate Payments",
    body: `If an amount is debited from your account but the registration fails, or you are charged more than once for the same registration, the excess amount is automatically reversed to your original payment method by our payment gateway partner, typically within 5–7 business days. If it isn't, please contact us with your payment reference.`,
  },
  {
    title: "6. How to Request a Refund",
    body: `To request a refund, first check the event page for the Organisation's contact details and refund process. If you're unable to resolve it with the Organisation, write to us at moderntechcreations2025@gmail.com with your registration/order ID, event name, and reason for the refund request.`,
  },
  {
    title: "7. Refund Processing Time",
    body: `Once a refund is approved, it is initiated to your original payment method (UPI, card, or bank account) and typically reflects within 5–7 business days, depending on your bank or payment provider's processing times.`,
  },
  {
    title: "8. Contact Us",
    body: `For refund or cancellation queries, reach us at moderntechcreations2025@gmail.com.`,
  },
]

export default function RefundPolicyPage() {
  return (
    <article className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Refund & Cancellation Policy</h1>
        <p className="text-sm text-text-faint">Last updated: August 2026</p>
      </div>

      <div className="space-y-6">
        {SECTIONS.map((section) => (
          <section key={section.title} className="space-y-1.5">
            <h2 className="text-base font-semibold text-foreground">{section.title}</h2>
            <p className="text-sm leading-relaxed text-text-muted">{section.body}</p>
          </section>
        ))}
      </div>
    </article>
  )
}
