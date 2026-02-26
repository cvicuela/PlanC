'use client';

import { useState } from 'react';
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
  Clock,
  User,
  ArrowLeft
} from 'lucide-react';
import { listings, CATEGORY_BADGE, CATEGORY_EMOJI, CATEGORY_LABELS } from '@/lib/mock-data';

const MapView = dynamic(() => import('@/components/map/MapClient'), { ssr: false });

export default function ListingDetailPage({ params }: { params: { id: string } }) {
  const listing = listings.find((l) => l.id === params.id);
  if (!listing) notFound();

  const router = useRouter();
  const [currentImg, setCurrentImg] = useState(0);

  const prev = () => setCurrentImg((i) => (i - 1 + listing.images.length) % listing.images.length);
  const next = () => setCurrentImg((i) => (i + 1) % listing.images.length);

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
          {/* Photo carousel */}
          <div className="relative rounded-2xl overflow-hidden bg-gray-200 aspect-[4/3] md:aspect-[16/9]">
            <img
              src={listing.images[currentImg]}
              alt={listing.name}
              className="w-full h-full object-cover"
            />
            {listing.images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow hover:bg-white transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-700" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow hover:bg-white transition-colors"
                >
                  <ChevronRight className="h-5 w-5 text-gray-700" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {listing.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImg(i)}
                      className={`h-1.5 rounded-full transition-all ${i === currentImg ? 'w-5 bg-white' : 'w-1.5 bg-white/60'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

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

          {/* Price (mobile) */}
          <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200 lg:hidden">
            <p className="text-sm text-gray-500">Precio</p>
            <p className="text-3xl font-bold text-gray-900 mt-0.5">
              DOP {listing.price.toLocaleString()}
              <span className="text-base font-normal text-gray-400 ml-1">/{listing.priceUnit}</span>
            </p>
            <Link
              href={`/booking/${listing.id}`}
              className="block mt-3 w-full text-center py-3 rounded-xl font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(to right, #7C3AED, #F97316)' }}
            >
              Reservar ahora
            </Link>
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

      {/* ── Mobile sticky footer ── */}
      <div className="lg:hidden fixed bottom-16 md:bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-40">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xl font-bold text-gray-900">
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
            className="flex-1 max-w-[180px] text-center py-3 rounded-xl font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(to right, #7C3AED, #F97316)' }}
          >
            Reservar ahora
          </Link>
        </div>
      </div>
    </div>
  );
}
