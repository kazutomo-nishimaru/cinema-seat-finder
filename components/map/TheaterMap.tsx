'use client';

import { useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps';
import type { Theater } from '@/lib/types';

type Props = {
  theaters: Theater[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  userLocation: { lat: number; lng: number } | null;
};

const TOKYO_CENTER = { lat: 35.6762, lng: 139.6503 };
const DEFAULT_ZOOM = 12;
const LOCATE_ZOOM = 14;
const MAP_ID = 'cinema_seat_finder_map';

const PIN_COLORS = {
  default: { background: '#2563EB', border: '#1D4ED8' },
  selected: { background: '#DC2626', border: '#991B1B' },
} as const;

function MapController({ target }: { target: { lat: number; lng: number } | null }) {
  const map = useMap();
  useEffect(() => {
    if (!map || !target) return;
    map.panTo(target);
    map.setZoom(LOCATE_ZOOM);
  }, [map, target]);
  return null;
}

export default function TheaterMap({ theaters, selectedId, onSelect, userLocation }: Props) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';

  if (!apiKey) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <p className="text-sm text-gray-500 text-center">
          Google Maps API キーが設定されていません
          <br />
          <span className="text-xs">
            .env.local に NEXT_PUBLIC_GOOGLE_MAPS_API_KEY を設定してください
          </span>
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={TOKYO_CENTER}
          defaultZoom={DEFAULT_ZOOM}
          mapId={MAP_ID}
          gestureHandling="greedy"
          disableDefaultUI={false}
          style={{ width: '100%', height: '100%' }}
          onClick={() => onSelect(null)}
        >
          <MapController target={userLocation} />

          {theaters.map((theater) => {
            const isSelected = selectedId === theater.theater_id;
            const colors = isSelected ? PIN_COLORS.selected : PIN_COLORS.default;
            return (
              <AdvancedMarker
                key={theater.theater_id}
                position={{ lat: theater.lat, lng: theater.lng }}
                title={theater.name}
                onClick={() => onSelect(theater.theater_id)}
              >
                <Pin
                  background={colors.background}
                  borderColor={colors.border}
                  glyphColor="#FFFFFF"
                  scale={isSelected ? 1.3 : 1}
                />
              </AdvancedMarker>
            );
          })}
        </Map>
      </APIProvider>
    </div>
  );
}
