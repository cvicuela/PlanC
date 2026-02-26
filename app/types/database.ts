// ============================================================
// TalentHub — Supabase Database Types
// Generated manually to match /supabase/schema.sql
// ============================================================

// ── Enums ─────────────────────────────────────────────────────────────────────
export type Role = 'user' | 'supplier';
export type ListingCategory = 'talent' | 'space' | 'media';
export type PriceUnit = 'hour' | 'day' | 'event' | 'week' | 'month';
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

// ── Stripe enums (from original template) ────────────────────────────────────
export type PricingPlanInterval = 'day' | 'week' | 'month' | 'year';
export type PricingType = 'one_time' | 'recurring';
export type SubscriptionStatus =
  | 'trialing'
  | 'active'
  | 'canceled'
  | 'incomplete'
  | 'incomplete_expired'
  | 'past_due'
  | 'unpaid'
  | 'paused';

// ── Row types ─────────────────────────────────────────────────────────────────

export interface Profile {
  id: string;
  name: string | null;
  avatar_url: string | null;
  role: Role;
  phone: string | null;
  location_lat: number | null;
  location_lng: number | null;
  location_address: string | null;
  created_at: string;
}

export interface Listing {
  id: string;
  supplier_id: string;
  category: ListingCategory;
  subcategory: string | null;
  title: string;
  description: string | null;
  long_description: string | null;
  price: number;
  price_unit: PriceUnit | null;
  images: string[] | null;
  location_lat: number | null;
  location_lng: number | null;
  location_address: string | null;
  location_sector: string | null;
  rating: number;
  reviews_count: number;
  is_active: boolean;
  verified: boolean;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  user_id: string | null;
  listing_id: string | null;
  start_at: string | null;
  end_at: string | null;
  status: BookingStatus;
  total_price: number | null;
  notes: string | null;
  campaign_duration: string | null;
  campaign_budget: number | null;
  campaign_message: string | null;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  booking_id: string | null;
  user_id: string | null;
  listing_id: string | null;
  rating: number;
  comment: string | null;
  created_at: string;
}

export interface Message {
  id: string;
  booking_id: string | null;
  sender_id: string | null;
  receiver_id: string | null;
  content: string;
  read: boolean;
  created_at: string;
}

export interface Waitlist {
  id: string;
  email: string;
  name: string | null;
  role: Role;
  created_at: string;
}

// ── Stripe tables (from original template) ────────────────────────────────────
export interface StripeUser {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  billing_address: Record<string, unknown> | null;
  payment_method: Record<string, unknown> | null;
}

export interface Customer {
  id: string;
  stripe_customer_id: string | null;
}

export interface Product {
  id: string;
  active: boolean | null;
  name: string | null;
  description: string | null;
  image: string | null;
  metadata: Record<string, unknown> | null;
}

export interface Price {
  id: string;
  product_id: string | null;
  active: boolean | null;
  description: string | null;
  unit_amount: number | null;
  currency: string | null;
  type: PricingType | null;
  interval: PricingPlanInterval | null;
  interval_count: number | null;
  trial_period_days: number | null;
  metadata: Record<string, unknown> | null;
}

export interface Subscription {
  id: string;
  user_id: string;
  status: SubscriptionStatus | null;
  metadata: Record<string, unknown> | null;
  price_id: string | null;
  quantity: number | null;
  cancel_at_period_end: boolean | null;
  created: string;
  current_period_start: string;
  current_period_end: string;
  ended_at: string | null;
  cancel_at: string | null;
  canceled_at: string | null;
  trial_start: string | null;
  trial_end: string | null;
}

// ── Insert types (omit auto-generated fields) ─────────────────────────────────

export type ProfileInsert = Omit<Profile, 'created_at'> & Partial<Pick<Profile, 'created_at'>>;

export type ListingInsert = Omit<Listing, 'id' | 'rating' | 'reviews_count' | 'created_at' | 'updated_at'>
  & Partial<Pick<Listing, 'id' | 'rating' | 'reviews_count' | 'created_at' | 'updated_at'>>;

export type BookingInsert = Omit<Booking, 'id' | 'created_at' | 'updated_at'>
  & Partial<Pick<Booking, 'id' | 'created_at' | 'updated_at'>>;

export type ReviewInsert = Omit<Review, 'id' | 'created_at'>
  & Partial<Pick<Review, 'id' | 'created_at'>>;

export type MessageInsert = Omit<Message, 'id' | 'created_at'>
  & Partial<Pick<Message, 'id' | 'created_at'>>;

export type WaitlistInsert = Omit<Waitlist, 'id' | 'created_at'>
  & Partial<Pick<Waitlist, 'id' | 'created_at'>>;

// ── Update types (all fields optional) ───────────────────────────────────────
export type ProfileUpdate = Partial<ProfileInsert>;
export type ListingUpdate = Partial<ListingInsert>;
export type BookingUpdate = Partial<BookingInsert>;
export type ReviewUpdate = Partial<ReviewInsert>;
export type MessageUpdate = Partial<MessageInsert>;

// ── Supabase Database type (used to type the Supabase client) ─────────────────
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: ProfileInsert;
        Update: ProfileUpdate;
        Relationships: [
          { foreignKeyName: 'profiles_id_fkey'; columns: ['id']; referencedRelation: 'users'; referencedColumns: ['id'] }
        ];
      };
      listings: {
        Row: Listing;
        Insert: ListingInsert;
        Update: ListingUpdate;
        Relationships: [
          { foreignKeyName: 'listings_supplier_id_fkey'; columns: ['supplier_id']; referencedRelation: 'profiles'; referencedColumns: ['id'] }
        ];
      };
      bookings: {
        Row: Booking;
        Insert: BookingInsert;
        Update: BookingUpdate;
        Relationships: [
          { foreignKeyName: 'bookings_user_id_fkey'; columns: ['user_id']; referencedRelation: 'profiles'; referencedColumns: ['id'] },
          { foreignKeyName: 'bookings_listing_id_fkey'; columns: ['listing_id']; referencedRelation: 'listings'; referencedColumns: ['id'] }
        ];
      };
      reviews: {
        Row: Review;
        Insert: ReviewInsert;
        Update: ReviewUpdate;
        Relationships: [
          { foreignKeyName: 'reviews_booking_id_fkey'; columns: ['booking_id']; referencedRelation: 'bookings'; referencedColumns: ['id'] },
          { foreignKeyName: 'reviews_user_id_fkey'; columns: ['user_id']; referencedRelation: 'profiles'; referencedColumns: ['id'] },
          { foreignKeyName: 'reviews_listing_id_fkey'; columns: ['listing_id']; referencedRelation: 'listings'; referencedColumns: ['id'] }
        ];
      };
      messages: {
        Row: Message;
        Insert: MessageInsert;
        Update: MessageUpdate;
        Relationships: [
          { foreignKeyName: 'messages_sender_id_fkey'; columns: ['sender_id']; referencedRelation: 'profiles'; referencedColumns: ['id'] },
          { foreignKeyName: 'messages_receiver_id_fkey'; columns: ['receiver_id']; referencedRelation: 'profiles'; referencedColumns: ['id'] },
          { foreignKeyName: 'messages_booking_id_fkey'; columns: ['booking_id']; referencedRelation: 'bookings'; referencedColumns: ['id'] }
        ];
      };
      waitlist: {
        Row: Waitlist;
        Insert: WaitlistInsert;
        Update: Partial<WaitlistInsert>;
        Relationships: [];
      };
      // Stripe tables
      users: {
        Row: StripeUser;
        Insert: Partial<StripeUser>;
        Update: Partial<StripeUser>;
        Relationships: [];
      };
      customers: {
        Row: Customer;
        Insert: Customer;
        Update: Partial<Customer>;
        Relationships: [];
      };
      products: {
        Row: Product;
        Insert: Partial<Product> & Pick<Product, 'id'>;
        Update: Partial<Product>;
        Relationships: [];
      };
      prices: {
        Row: Price;
        Insert: Partial<Price> & Pick<Price, 'id'>;
        Update: Partial<Price>;
        Relationships: [
          { foreignKeyName: 'prices_product_id_fkey'; columns: ['product_id']; referencedRelation: 'products'; referencedColumns: ['id'] }
        ];
      };
      subscriptions: {
        Row: Subscription;
        Insert: Partial<Subscription> & Pick<Subscription, 'id' | 'user_id'>;
        Update: Partial<Subscription>;
        Relationships: [
          { foreignKeyName: 'subscriptions_user_id_fkey'; columns: ['user_id']; referencedRelation: 'users'; referencedColumns: ['id'] },
          { foreignKeyName: 'subscriptions_price_id_fkey'; columns: ['price_id']; referencedRelation: 'prices'; referencedColumns: ['id'] }
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      pricing_plan_interval: PricingPlanInterval;
      pricing_type: PricingType;
      subscription_status: SubscriptionStatus;
    };
    CompositeTypes: Record<string, never>;
  };
}

// ── Convenience helpers ───────────────────────────────────────────────────────
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

export type TablesInsert<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];

export type TablesUpdate<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];

// ── Joined types (common query patterns) ─────────────────────────────────────
export interface ListingWithSupplier extends Listing {
  profiles: Pick<Profile, 'id' | 'name' | 'avatar_url' | 'rating'> & { rating?: number };
}

export interface BookingWithListing extends Booking {
  listings: Pick<Listing, 'id' | 'title' | 'category' | 'images' | 'price' | 'price_unit'>;
}

export interface BookingWithAll extends Booking {
  listings: Listing & { profiles: Profile };
  profiles: Profile;
}

export interface ReviewWithProfile extends Review {
  profiles: Pick<Profile, 'id' | 'name' | 'avatar_url'>;
}

export interface MessageWithProfiles extends Message {
  sender: Pick<Profile, 'id' | 'name' | 'avatar_url'>;
  receiver: Pick<Profile, 'id' | 'name' | 'avatar_url'>;
}
