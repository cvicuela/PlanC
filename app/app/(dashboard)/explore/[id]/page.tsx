'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { notFound, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  Star,
  MapPin,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Calendar,
  X,
  ArrowLeft
} from 'lucide-react';
import { listings, CATEGORY_BADGE, CATEGORY_EMOJI, CATEGORY_LABELS } from '@/lib/mock-data';

const MapView = dynamic(() => import('@/components/map/MapClient'), { ssr: false });

export default function ListingDetailPage({ params }: { params: { id: string } }) {
  const listing = listings.find((l) => l.id === params.id);
  if (!listing) notFound();

  const router = useRouter();
  const [currentImg, setCurrentImg] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const prev = () => setCurrentImg((i) => (i - 1 + listing.images.length) % listing.images.length);
  const next = () => setCurrentImg((i) => (i + 1) % listing.images.length);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  }, [listing.images.length]);

  // Lock body scroll when fullscreen gallery is open
  useEffect(() => {
    if (showFullscreen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [showFullscreen]);

  return (
    <div className="max-w-5xl mx-auto pb-32 md:pb-10">
      {/* Back */}
      <div className="px-4 pt-4 pb-2">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a resultados
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 px-4">
        {/* ── Left column ── */}
        <div className="flex-1 min-w-0">
          {/* Photo carousel — swipeable on mobile, tap to fullscreen */}
          <div
            className="relative rounded-2xl overflow-hidden bg-gray-200 aspect-[4/3] md:aspect-[16/9] cursor-pointer"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onClick={() => setShowFullscreen(true)}
          >
            <img
              src={listing.images[currentImg]}
              alt={listing.name}
              className="w-full h-full object-cover"
              draggable={false}
            />
            {listing.images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow hover:bg-white transition-colors hidden md:block"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-700" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow hover:bg-white transition-colors hidden md:block"
                >
                  <ChevronRight className="h-5 w-5 text-gray-700" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {listing.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setCurrentImg(i); }}
                      className={`h-1.5 rounded-full transition-all ${i === currentImg ? 'w-5 bg-white' : 'w-1.5 bg-white/60'}`}
                    />
                  ))}
                </div>
                {/* Mobile: photo count badge */}
                <div className="md:hidden absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
                  {currentImg + 1}/{listing.images.length}
                </div>
              </>
            )}
          </div>

          {/* ── Fullscreen photo gallery overlay (mobile) ── */}
          {showFullscreen && (
            <div className="fixed inset-0 z-[9999] bg-black flex flex-col photo-overlay">
              <div className="flex items-center justify-between px-4 py-3 safe-pt">
                <button
                  onClick={() => setShowFullscreen(false)}
                  className="text-white p-1"
                >
                  <X className="h-6 w-6" />
                </button>
                <span className="text-white text-sm font-medium">
                  {currentImg + 1} / {listing.images.length}
                </span>
                <div className="w-8" />
              </div>
              <div
                className="flex-1 flex items-center justify-center overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <img
                  src={listing.images[currentImg]}
                  alt={listing.name}
                  className="max-w-full max-h-full object-contain"
                  draggable={false}
                />
              </div>
              {/* Thumbnail strip */}
              <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide safe-pb">
                {listing.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImg(i)}
                    className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                      i === currentImg ? 'border-white' : 'border-transparent opacity-50'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Title & meta */}
          <div className="mt-5">
            <div className="flex items-start gap-3 flex-wrap">
              <span className={`text-sm font-medium px-2.5 py-1 rounded-full ${CATEGORY_BADGE[listing.category]}`}>
                {CATEGORY_EMOJI[listing.category]} {CATEGORY_LABELS[listing.category]} · {listing.subcategory}
              </span>
              {listing.verified && (
                <span className="flex items-center gap-1 text-sm font-medium text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  Verificado
                </span>
              )}
            </div>
            <h1 className="mt-2 text-2xl font-bold text-gray-900">{listing.name}</h1>
            <div className="mt-2 flex items-center gap-4 text-sm flex-wrap">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{listing.rating}</span>
                <span className="text-gray-500">({listing.reviewCount} reseñas)</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <MapPin className="h-4 w-4" />
                {listing.location.sector}, {listing.location.city}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Descripción</h2>
            <p className="text-gray-600 leading-relaxed">{listing.longDescription}</p>
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {listing.tags.map((t) => (
              <span key={t} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                {t}
              </span>
            ))}
          </div>

          {/* Availability */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Disponibilidad</h2>
            <div className="flex flex-wrap gap-2">
              {listing.availability.map((date) => (
                <div
                  key={date}
                  className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white"
                >
                  <Calendar className="h-4 w-4 text-[#7C3AED]" />
                  {new Date(date + 'T12:00:00').toLocaleDateString('es-DO', { weekday: 'short', month: 'short', day: 'numeric' })}
                </div>
              ))}
            </div>
          </div>

          {/* Small map */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Ubicación</h2>
            <div className="h-52 rounded-xl overflow-hidden border border-gray-200">
              <MapView
                singlePin={{ lat: listing.location.lat, lng: listing.location.lng, label: listing.name }}
                center={[listing.location.lat, listing.location.lng]}
                zoom={15}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500 flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {listing.location.address}, {listing.location.sector}
            </p>
          </div>

          {/* Supplier card */}
          <div className="mt-6 p-4 bg-white border border-gray-200 rounded-xl">
            <h2 className="text-base font-semibold text-gray-900 mb-3">Sobre el suplidor</h2>
            <div className="flex items-center gap-3">
              <img
                src={listing.supplier.avatar}
                alt={listing.supplier.name}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900">{listing.supplier.name}</p>
                <p className="text-sm text-gray-500">Miembro desde {listing.supplier.memberSince}</p>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-sm">{listing.supplier.rating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right sticky column (desktop) ── */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <div className="sticky top-4 bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
            <p className="text-sm text-gray-500">Precio desde</p>
            <p className="text-3xl font-bold text-gray-900 mt-0.5">
              DOP {listing.price.toLocaleString()}
              <span className="text-sm font-normal text-gray-400 ml-1">/{listing.priceUnit}</span>
            </p>

            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-gray-900">{listing.rating}</span>
              <span>· {listing.reviewCount} reseñas</span>
            </div>

            <hr className="my-4 border-gray-100" />

            <Link
              href={`/booking/${listing.id}`}
              className="block w-full text-center py-3.5 rounded-xl font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(to right, #7C3AED, #F97316)' }}
            >
              Reservar ahora
            </Link>

            <p className="mt-3 text-xs text-center text-gray-400">
              No se hace ningún cargo todavía
            </p>
          </div>
        </div>
      </div>

      {/* ── Mobile sticky footer — "Reservar — DOP $X,XXX/hora" ── */}
      <div className="lg:hidden fixed bottom-[var(--bottom-nav-h)] md:bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3 z-40">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-lg font-bold text-gray-900">
              DOP {listing.price.toLocaleString()}
              <span className="text-sm font-normal text-gray-400 ml-1">/{listing.priceUnit}</span>
            </p>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              {listing.rating} · {listing.reviewCount} reseñas
            </div>
          </div>
          <Link
            href={`/booking/${listing.id}`}
            className="flex-shrink-0 text-center px-5 py-3 rounded-xl font-semibold text-white text-sm transition-opacity hover:opacity-90 active:scale-95 transition-transform"
            style={{ background: 'linear-gradient(to right, #7C3AED, #F97316)' }}
          >
            Reservar — DOP ${listing.price.toLocaleString()}/{listing.priceUnit}
          </Link>
        </div>
      </div>
    </div>
  );
}
