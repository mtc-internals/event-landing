import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and Conditions for using the HappnCity website and app.",
};

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: `HappnCity (this website and the HappnCity mobile app) is owned and operated by Modern Tech Creations ("HappnCity", "we", "us", "our"). By accessing this website or creating an account on the HappnCity app, you agree to be bound by these Terms & Conditions and our Privacy Policy. If you do not agree, please do not use the platform.`,
  },
  {
    title: "2. What HappnCity Is",
    body: `This website lets you discover events — tech meetups, workshops, concerts, and community gatherings — happening near you. Account creation, RSVPs, ticket registration, and payments happen through the HappnCity mobile app or through flows provided by the organising Organisation, not on this website.`,
  },
  {
    title: "3. Eligibility",
    body: `You must be at least 13 years old to use HappnCity. By registering on the app, you confirm that the information you provide (including your mobile number and profile details) is accurate and belongs to you.`,
  },
  {
    title: "4. Organisations & Event Listings",
    body: `Users may create or join Organisations on the HappnCity app to publish and manage Events. Organisation admins and owners are solely responsible for the accuracy of the event details, ticketing information, and communications they publish. HappnCity does not independently verify listings and is not a party to the agreement between an attendee and an Organisation.`,
  },
  {
    title: "5. Payments, Ticketing & Refunds",
    body: `Where an event charges a fee, payments are processed through our third-party payment gateway partners. Refund and cancellation policies are set by the organising Organisation and displayed on the relevant event page, subject to our Refund & Cancellation Policy and applicable Indian law.`,
  },
  {
    title: "6. Acceptable Use",
    body: `You agree not to misuse the platform — including posting false or misleading event information, scraping or harvesting data from this website, attempting to circumvent security measures, or using the platform for any unlawful purpose.`,
  },
  {
    title: "7. Content Ownership",
    body: `Organisations retain ownership of the content they submit (event listings, images, descriptions). By publishing content, they grant HappnCity a non-exclusive licence to display it on this website and the HappnCity app as part of operating the platform.`,
  },
  {
    title: "8. Third-Party Links & App Stores",
    body: `This website may link to the Apple App Store, Google Play, or an Organisation's own channels. We are not responsible for the content or practices of those third-party sites and stores.`,
  },
  {
    title: "9. Limitation of Liability",
    body: `HappnCity is provided "as is". To the maximum extent permitted by law, we are not liable for disputes between attendees and event organisers, or for losses arising from events listed on the platform.`,
  },
  {
    title: "10. Governing Law",
    body: `These Terms are governed by the laws of India. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of India.`,
  },
  {
    title: "11. Changes to These Terms",
    body: `We may update these Terms from time to time. Continued use of HappnCity after changes are posted constitutes acceptance of the revised Terms.`,
  },
  {
    title: "12. Contact Us",
    body: `For questions about these Terms, write to us at moderntechcreations2025@gmail.com.`,
  },
]

export default function TermsPage() {
  return (
    <article className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Terms & Conditions</h1>
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
