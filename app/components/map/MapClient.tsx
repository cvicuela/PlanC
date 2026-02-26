'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Listing, CATEGORY_COLORS } from '@/lib/mock-data';

// Custom coloured circle markers — no PNG assets needed
function createMarkerIcon(color: string, size = 14) {
  return L.divIcon({
    html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};border:2.5px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.35);"></div>`,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2]
  });
}

// Helper sub-component to fly to a new center when it changes
function FlyTo({ center, zoom }: { center: [number, number]; zoom?: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom ?? map.getZoom(), { duration: 1 });
  }, [center, zoom, map]);
  return null;
}

// Sub-component that fires onMapClick
function ClickHandler({ onMapClick }: { onMapClick?: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onMapClick?.(e.latlng.lat, e.latlng.lng);
    }
  });
  return null;
}

interface MapClientProps {
  listings?: Listing[];
  /** Single pin mode (for detail / wizard) */
  singlePin?: { lat: number; lng: number; label?: string; color?: string };
  center?: [number, number];
  zoom?: number;
  onMapClick?: (lat: number, lng: number) => void;
  className?: string;
}

export default function MapClient({
  listings = [],
  singlePin,
  center = [18.4861, -69.9312],
  zoom = 13,
  onMapClick,
  className = 'h-full w-full'
}: MapClientProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom
      style={{ height: '100%', width: '100%' }}
      className={className}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {onMapClick && <ClickHandler onMapClick={onMapClick} />}

      {/* Multi-listing markers */}
      {listings.map((l) => (
        <Marker
          key={l.id}
          position={[l.location.lat, l.location.lng]}
          icon={createMarkerIcon(CATEGORY_COLORS[l.category] ?? '#7C3AED')}
        >
          <Popup>
            <div style={{ minWidth: 180 }}>
              <p style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>{l.name}</p>
              <p style={{ fontSize: 11, color: '#6B7280', marginBottom: 6 }}>{l.subcategory}</p>
              <p style={{ fontWeight: 700, fontSize: 13 }}>
                DOP {l.price.toLocaleString()} /{l.priceUnit}
              </p>
              <a
                href={`/explore/${l.id}`}
                style={{ display: 'block', marginTop: 8, fontSize: 12, color: '#7C3AED' }}
              >
                Ver detalle →
              </a>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Single-pin mode */}
      {singlePin && (
        <Marker
          position={[singlePin.lat, singlePin.lng]}
          icon={createMarkerIcon(singlePin.color ?? '#7C3AED', 16)}
        >
          {singlePin.label && (
            <Popup>
              <p style={{ fontSize: 13, fontWeight: 600 }}>{singlePin.label}</p>
            </Popup>
          )}
        </Marker>
      )}
    </MapContainer>
  );
}
