/**
 * TalentHub — Supabase Client Exports
 *
 * Exporta clientes Supabase tipados con el schema completo de TalentHub.
 * Usa @supabase/ssr para soporte correcto de SSR en Next.js 14.
 *
 * Uso:
 *   Client Component → import { getBrowserClient } from '@/lib/supabase'
 *   Server Component → import { createClient } from '@/utils/supabase/server'
 *   Admin (server)   → import { getServiceClient } from '@/lib/supabase'
 */

import { createBrowserClient, createServerClient, type CookieOptions } from '@supabase/ssr';
import { createClient as createAdminClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';

// ── Browser client (Client Components) ──────────────────────────────────────
/**
 * Cliente para Client Components con el Database type de TalentHub.
 */
export function getBrowserClient() {
  return createBrowserClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// ── Admin client (Service Role — solo server-side) ────────────────────────────
/**
 * Cliente con SERVICE_ROLE_KEY — bypass de RLS.
 * NUNCA usar en Client Components ni exponer al cliente.
 * Solo para: webhooks, cron jobs, tareas administrativas.
 */
export function getServiceClient() {
  if (!SUPABASE_SERVICE_KEY) {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY is not set. This client is server-only.'
    );
  }
  return createAdminClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
}

// ── Typed query helpers ───────────────────────────────────────────────────────
// Acepta SupabaseClient genérico para compatibilidad con browser y server clients.
type AnySupabaseClient = SupabaseClient<Database>;

/**
 * Obtiene el perfil del usuario por ID.
 */
export async function getProfile(supabase: AnySupabaseClient, userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data;
}

/**
 * Obtiene listings activos con filtros opcionales.
 */
export async function getListings(
  supabase: AnySupabaseClient,
  opts: {
    category?: 'talent' | 'space' | 'media';
    supplierId?: string;
    limit?: number;
    offset?: number;
  } = {}
) {
  let query = supabase
    .from('listings')
    .select('*, profiles(id, name, avatar_url)')
    .eq('is_active', true)
    .order('rating', { ascending: false });

  if (opts.category) query = (query as any).eq('category', opts.category);
  if (opts.supplierId) query = (query as any).eq('supplier_id', opts.supplierId);
  if (opts.limit) query = (query as any).limit(opts.limit);
  if (opts.offset) {
    query = (query as any).range(opts.offset, opts.offset + (opts.limit ?? 10) - 1);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

/**
 * Obtiene las reservas del usuario autenticado.
 */
export async function getUserBookings(
  supabase: AnySupabaseClient,
  userId: string,
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
) {
  let query = supabase
    .from('bookings')
    .select('*, listings(id, title, category, images, price, price_unit)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (status) query = (query as any).eq('status', status);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

/**
 * Obtiene las reservas entrantes para los listings de un suplidor.
 */
export async function getSupplierBookings(
  supabase: AnySupabaseClient,
  supplierId: string
) {
  const { data, error } = await supabase
    .from('bookings')
    .select(
      '*, listings!inner(id, title, supplier_id), profiles!bookings_user_id_fkey(id, name, avatar_url)'
    )
    .eq('listings.supplier_id', supplierId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Inserta un email en la waitlist.
 */
export async function joinWaitlist(
  supabase: AnySupabaseClient,
  email: string,
  name?: string,
  role: 'user' | 'supplier' = 'user'
) {
  const { data, error } = await supabase
    .from('waitlist')
    .insert({ email, name: name ?? null, role })
    .select()
    .single();

  if (error) throw error;
  return data;
}
