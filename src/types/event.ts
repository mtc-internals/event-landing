export type EventStatus =
  | "draft"
  | "scheduled"
  | "active"
  | "reg_closed"
  | "housefull"
  | "ongoing"
  | "completed"
  | "cancelled";

export type VenueType = "physical" | "online" | "hybrid";

/** Row shape shared by GET /events (browse) and GET /events/trending. */
export interface EventSummary {
  id: number;
  slug: string;
  title: string;
  short_description: string | null;
  banner_url: string | null;
  category: string;
  status: EventStatus;
  starts_at: string;
  ends_at?: string | null;
  venue_type: VenueType;
  venue_name: string | null;
  city_name: string | null;
  is_free: 0 | 1;
  rsvp_limit: number | null;
  rsvp_count: number;
  view_count?: number;
  is_team_event?: 0 | 1;
  is_sponsored?: 0 | 1;
  is_actively_sponsored?: 0 | 1;
  org_id: number;
  org_name: string;
  org_logo_url: string | null;
  org_is_verified: 0 | 1;
  is_saved: 0 | 1 | null;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  has_more: boolean;
}

export interface BrowseEventsResult {
  events: EventSummary[];
  pagination: Pagination;
}

export interface EventCategoryCount {
  code: string;
  label: string;
  event_count: number;
}

export interface City {
  id: number;
  name: string;
  state: string;
  country: string;
  slug: string;
  latitude: string | null;
  longitude: string | null;
  is_active: 0 | 1;
}

export interface FeaturedEvent {
  /** Format: "evt_<numericId>" */
  id: string;
  title: string;
  category: string;
  date: string;
  day_label: string;
  going_count: number;
  image_url: string;
}

export interface EventSession {
  id: number;
  title: string;
  session_date: string;
  starts_at: string;
  ends_at: string | null;
  venue_name: string | null;
  description: string | null;
  is_team_session: 0 | 1;
  team_min_size: number | null;
  team_max_size: number | null;
  has_awards: 0 | 1;
}

export interface EventTicket {
  id: number;
  name: string;
  description: string | null;
  price: string;
  quantity: number | null;
  sold_count: number;
  quantity_remaining: number | null;
  is_active: 0 | 1;
  session_id: number | null;
  is_team_ticket: 0 | 1;
  team_min_size: number | null;
  team_max_size: number | null;
  fee_breakdown: {
    face_value: number;
    platform_fee: number;
    gst_on_fee: number;
    total_payable: number;
    fee_bearer: "organiser" | "buyer";
  } | null;
}

export interface EventSpeaker {
  id: number;
  name: string;
  title: string | null;
  bio: string | null;
  photo_url: string | null;
  linkedin_url: string | null;
}

export interface EventSponsor {
  id: number;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  tier: string;
}

export interface EventFAQ {
  id: number;
  question: string;
  answer: string;
}

export interface EventAward {
  id: number;
  session_id: number | null;
  award_name: string;
  award_type: string;
  cash_amount: string | null;
  currency: string;
  award_description: string | null;
  position_rank: number | null;
  position_label: string | null;
  is_team_award: 0 | 1;
  display_order: number;
}

/** Full shape returned by GET /events/:eventId */
export interface EventDetail {
  id: number;
  slug: string;
  title: string;
  short_description: string | null;
  description: string | null;
  banner_url: string | null;
  category: string;
  tags: string[] | null;
  status: EventStatus;
  event_format: "single_day" | "multi_day";
  has_multiple_sessions: 0 | 1;
  starts_at: string;
  ends_at: string | null;
  registration_opens_at: string | null;
  registration_closes_at: string | null;
  venue_type: VenueType;
  venue_name: string | null;
  venue_address: string | null;
  venue_lat: string | null;
  venue_lng: string | null;
  venue_notes: string | null;
  online_platform: string | null;
  online_link_public: 0 | 1;
  online_link: string | null;
  city_id: number | null;
  city_name: string | null;
  is_free: 0 | 1;
  fee_bearer: "organiser" | "buyer";
  rsvp_limit: number | null;
  rsvp_count: number;
  view_count: number;
  require_approval: 0 | 1;
  is_team_event: 0 | 1;
  team_min_size: number | null;
  team_max_size: number | null;
  has_awards: 0 | 1;
  event_language: string[] | null;
  confirmation_message: string | null;
  cancellation_reason: string | null;
  is_sponsored: 0 | 1;
  is_actively_sponsored: 0 | 1;
  org_id: number;
  org_name: string;
  org_slug: string;
  org_logo_url: string | null;
  org_is_verified: 0 | 1;
  org_follower_count: number;
  sessions: EventSession[];
  tickets: EventTicket[];
  speakers: EventSpeaker[];
  sponsors: EventSponsor[];
  faqs: EventFAQ[];
  awards: EventAward[];
  is_saved: boolean | null;
}
