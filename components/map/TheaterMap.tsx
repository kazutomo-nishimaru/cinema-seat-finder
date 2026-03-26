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

// 東京都心をデフォルトの地図中心に設定
const TOKYO_CENTER = { lat: 35.6762, lng: 139.6503 };

// 現在地や選択状態に応じて地図を移動させる制御コンポーネント
function MapController({
  target,
}: {
  target: { lat: number; lng: number } | null;
}) {
  const map = useMap();
  useEffect(() => {
    if (!map || !target) return;
    map.panTo(target);
    map.setZoom(14);
  }, [map, target]);
  return null;
}

export default function TheaterMap({ theaters, selectedId, onSelect, userLocation }: Props) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';

  // APIキー未設定時のフォールバック表示
  if (!apiKey) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <p className="text-sm text-gray-500">
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
          defaultZoom={12}
          mapId="cinema_seat_finder_map"
          gestureHandling="greedy"
          disableDefaultUI={false}
          style={{ width: '100%', height: '100%' }}
          onClick={() => onSelect(null)}
        >
          {/* 現在地・選択に応じた地図移動 */}
          <MapController target={userLocation} />

          {/* 映画館ピン */}
          {theaters.map((theater) => {
            const isSelected = selectedId === theater.theater_id;
            return (
              <AdvancedMarker
                key={theater.theater_id}
                position={{ lat: theater.lat, lng: theater.lng }}
                title={theater.name}
                onClick={() => onSelect(theater.theater_id)}
              >
                <Pin
                  background={isSelected ? '#DC2626' : '#2563EB'}
                  borderColor={isSelected ? '#991B1B' : '#1D4ED8'}
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
