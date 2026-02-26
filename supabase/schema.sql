-- ============================================================
-- TalentHub — Supabase Schema
-- Ejecutar en el SQL Editor de Supabase dashboard
-- ============================================================

-- ── 1. EXTENDER AUTH.USERS (si no se puede, se usa user_metadata) ──────────
-- Nota: En Supabase Cloud no se puede alterar auth.users directamente.
-- El rol se almacena en user_metadata y se copia a profiles.

-- ── 2. PROFILES ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id             UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name           TEXT,
  avatar_url     TEXT,
  role           TEXT DEFAULT 'user' CHECK (role IN ('user', 'supplier')),
  phone          TEXT,
  location_lat   DECIMAL(10,8),
  location_lng   DECIMAL(11,8),
  location_address TEXT,
  created_at     TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ── 3. LISTINGS ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.listings (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  supplier_id      UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  category         TEXT CHECK (category IN ('talent', 'space', 'media')) NOT NULL,
  subcategory      TEXT,
  title            TEXT NOT NULL,
  description      TEXT,
  long_description TEXT,
  price            DECIMAL(10,2) NOT NULL,
  price_unit       TEXT CHECK (price_unit IN ('hour', 'day', 'event', 'week', 'month')),
  images           TEXT[],
  location_lat     DECIMAL(10,8),
  location_lng     DECIMAL(11,8),
  location_address TEXT,
  location_sector  TEXT,
  rating           DECIMAL(3,2) DEFAULT 0,
  reviews_count    INTEGER DEFAULT 0,
  is_active        BOOLEAN DEFAULT true,
  verified         BOOLEAN DEFAULT false,
  tags             TEXT[],
  created_at       TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at       TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ── 4. BOOKINGS ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.bookings (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id      UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  listing_id   UUID REFERENCES public.listings(id) ON DELETE SET NULL,
  start_at     TIMESTAMP WITH TIME ZONE,
  end_at       TIMESTAMP WITH TIME ZONE,
  status       TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  total_price  DECIMAL(10,2),
  notes        TEXT,
  -- For media listings
  campaign_duration TEXT,
  campaign_budget   DECIMAL(10,2),
  campaign_message  TEXT,
  created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ── 5. REVIEWS ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.reviews (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id  UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  user_id     UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  listing_id  UUID REFERENCES public.listings(id) ON DELETE CASCADE,
  rating      INTEGER CHECK (rating BETWEEN 1 AND 5) NOT NULL,
  comment     TEXT,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ── 6. MESSAGES ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.messages (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id  UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  sender_id   UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  receiver_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  content     TEXT NOT NULL,
  read        BOOLEAN DEFAULT false,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ── 7. WAITLIST ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.waitlist (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email      TEXT UNIQUE NOT NULL,
  name       TEXT,
  role       TEXT DEFAULT 'user' CHECK (role IN ('user', 'supplier')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ── 8. TRIGGER: auto-crear profile al registrarse ────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, avatar_url, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.raw_user_meta_data->>'avatar_url',
    COALESCE(NEW.raw_user_meta_data->>'role', 'user')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ── 9. TRIGGER: actualizar updated_at ────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER listings_updated_at
  BEFORE UPDATE ON public.listings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ── 10. FUNCIÓN: actualizar rating del listing tras nueva review ───────────
CREATE OR REPLACE FUNCTION public.update_listing_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.listings
  SET
    rating = (
      SELECT ROUND(AVG(rating)::NUMERIC, 2)
      FROM public.reviews
      WHERE listing_id = NEW.listing_id
    ),
    reviews_count = (
      SELECT COUNT(*)
      FROM public.reviews
      WHERE listing_id = NEW.listing_id
    )
  WHERE id = NEW.listing_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_review_created
  AFTER INSERT ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_listing_rating();

-- ── 11. ROW LEVEL SECURITY ────────────────────────────────────────────────────
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist  ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY "Profiles visibles para todos"
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Usuario inserta su propio perfil"
  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Usuario edita su perfil"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Listings
CREATE POLICY "Listings activos visibles para todos"
  ON public.listings FOR SELECT USING (is_active = true OR auth.uid() = supplier_id);

CREATE POLICY "Suplidor crea listings"
  ON public.listings FOR INSERT WITH CHECK (auth.uid() = supplier_id);

CREATE POLICY "Suplidor gestiona sus listings"
  ON public.listings FOR UPDATE USING (auth.uid() = supplier_id);

CREATE POLICY "Suplidor elimina sus listings"
  ON public.listings FOR DELETE USING (auth.uid() = supplier_id);

-- Bookings
CREATE POLICY "Usuario ve sus reservas"
  ON public.bookings FOR SELECT
  USING (
    auth.uid() = user_id OR
    auth.uid() = (SELECT supplier_id FROM public.listings WHERE id = listing_id)
  );

CREATE POLICY "Usuario autenticado crea reservas"
  ON public.bookings FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Participantes actualizan reserva"
  ON public.bookings FOR UPDATE
  USING (
    auth.uid() = user_id OR
    auth.uid() = (SELECT supplier_id FROM public.listings WHERE id = listing_id)
  );

-- Reviews
CREATE POLICY "Reviews visibles para todos"
  ON public.reviews FOR SELECT USING (true);

CREATE POLICY "Usuario deja reseñas de sus reservas"
  ON public.reviews FOR INSERT
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM public.bookings
      WHERE id = booking_id AND user_id = auth.uid() AND status = 'completed'
    )
  );

-- Messages
CREATE POLICY "Mensajes entre participantes"
  ON public.messages FOR ALL
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

-- Waitlist (pública para insertar, solo service role para leer)
CREATE POLICY "Cualquiera puede unirse a la waitlist"
  ON public.waitlist FOR INSERT WITH CHECK (true);

-- ── 12. ÍNDICES ──────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_listings_supplier_id ON public.listings(supplier_id);
CREATE INDEX IF NOT EXISTS idx_listings_category    ON public.listings(category);
CREATE INDEX IF NOT EXISTS idx_listings_is_active   ON public.listings(is_active);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id     ON public.bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_listing_id  ON public.bookings(listing_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status      ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_messages_sender      ON public.messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver    ON public.messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_booking     ON public.messages(booking_id);
CREATE INDEX IF NOT EXISTS idx_reviews_listing_id   ON public.reviews(listing_id);

-- ── 13. REALTIME ──────────────────────────────────────────────────────────────
-- Habilitar realtime para mensajes y bookings
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.bookings;
