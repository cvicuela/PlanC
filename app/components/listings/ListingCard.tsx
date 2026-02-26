import Link from 'next/link';
import { Star, MapPin } from 'lucide-react';
import { Listing, CATEGORY_BADGE, CATEGORY_EMOJI, CATEGORY_LABELS } from '@/lib/mock-data';

interface Props {
  listing: Listing;
  horizontal?: boolean;
}

export default function ListingCard({ listing, horizontal = true }: Props) {
  if (!horizontal) {
    // Grid / vertical card
    return (
      <Link
        href={`/explore/${listing.id}`}
        className="flex flex-col bg-white rounded-xl border border-gray-200 hover:border-brand-purple hover:shadow-md transition-all overflow-hidden group"
      >
        <div className="relative">
          <img
            src={listing.images[0]}
            alt={listing.name}
            className="w-full h-44 object-cover"
          />
          {listing.verified && (
            <span className="absolute top-2 right-2 bg-white text-xs font-semibold text-green-600 px-2 py-0.5 rounded-full shadow">
              ✓ Verificado
            </span>
          )}
        </div>
        <div className="p-3">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${CATEGORY_BADGE[listing.category]}`}>
            {CATEGORY_EMOJI[listing.category]} {CATEGORY_LABELS[listing.category]}
          </span>
          <h3 className="mt-1.5 text-sm font-semibold text-gray-900 group-hover:text-brand-purple truncate">
            {listing.name}
          </h3>
          <div className="mt-1 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-gray-600">{listing.rating} ({listing.reviewCount})</span>
            </div>
            <p className="text-sm font-bold text-gray-900">
              DOP {listing.price.toLocaleString()}<span className="text-xs font-normal text-gray-400">/{listing.priceUnit}</span>
            </p>
          </div>
          <div className="mt-1 flex items-center gap-1">
            <MapPin className="h-3 w-3 text-gray-400 flex-shrink-0" />
            <span className="text-xs text-gray-500 truncate">{listing.location.sector}</span>
          </div>
        </div>
      </Link>
    );
  }

  // Horizontal card (default for explore list)
  return (
    <Link
      href={`/explore/${listing.id}`}
      className="flex gap-3 p-3 bg-white rounded-xl border border-gray-200 hover:border-brand-purple hover:shadow-sm transition-all group"
    >
      <div className="relative flex-shrink-0">
        <img
          src={listing.images[0]}
          alt={listing.name}
          className="w-20 h-20 rounded-lg object-cover"
        />
        {listing.verified && (
          <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[9px] font-bold px-1 py-0.5 rounded-full">
            ✓
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${CATEGORY_BADGE[listing.category]}`}>
              {CATEGORY_EMOJI[listing.category]} {listing.subcategory}
            </span>
            <h3 className="mt-1 text-sm font-semibold text-gray-900 group-hover:text-brand-purple truncate">
              {listing.name}
            </h3>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-sm font-bold text-gray-900">DOP {listing.price.toLocaleString()}</p>
            <p className="text-xs text-gray-400">/{listing.priceUnit}</p>
          </div>
        </div>
        <div className="mt-1.5 flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-gray-600">{listing.rating} ({listing.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3 text-gray-400" />
            <span className="text-xs text-gray-500 truncate">{listing.location.sector}</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-400 line-clamp-1">{listing.description}</p>
      </div>
    </Link>
  );
}
