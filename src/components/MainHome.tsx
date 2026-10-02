import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MainHome: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState<number>(118.0148);
  const [lat, setLat] = useState<number>(-2.5489);
  const [zoom, setZoom] = useState<number>(5);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    })

    mapRef.current.on('move', () => {
      if (!mapRef.current) return;
      const center = mapRef.current.getCenter();
      setLng(Number(center.lng.toFixed(4)));
      setLat(Number(center.lat.toFixed(4)));
      setZoom(Number(mapRef.current.getZoom().toFixed(2)));
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  return (
    <div className="bg-amber-50/30 text-black min-h-screen py-10 px-4 sm:px-8 lg:px-12">
      <div className="bg-white border-4 border-black p-0 shadow-[8px_8px_0px_0px_#000] relative overflow-hidden h-125">
        <div
          ref={mapContainerRef}
          className="w-full h-full"
        />
      </div>

      <div className="max-w-7xl mx-auto space-y-12 mt-8">
        <div className="bg-white border-4 border-black p-8 sm:p-12 shadow-[8px_8px_0px_0px_#000] relative overflow-hidden">
          <div className="inline-block bg-yellow-300 border-3 border-black px-4 py-1.5 font-black text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_#000] -rotate-1 mb-4">
            DESIGN SYSTEM & UI KIT TEMPLATE
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black leading-tight">
            Panduan Komponen Neo-Brutalism
          </h1>
          <p className="mt-3 text-base sm:text-lg font-bold text-zinc-700 max-w-3xl leading-relaxed">
            Halaman contoh ini berisi templat resmi untuk komponen **Neo-Brutalism** di GeoSandbox Dashboard. Anda dapat langsung mencontoh class Tailwind, warna, border, dan shadow di bawah ini untuk membuat halaman baru.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="bg-cyan-200 border-2 border-black px-3 py-1 font-extrabold text-xs uppercase shadow-[2px_2px_0px_0px_#000]">
              Warna Utama: White (#FFFFFF)
            </span>
            <span className="bg-lime-200 border-2 border-black px-3 py-1 font-extrabold text-xs uppercase shadow-[2px_2px_0px_0px_#000]">
              Border: 2px / 3px / 4px Solid Black
            </span>
            <span className="bg-purple-200 border-2 border-black px-3 py-1 font-extrabold text-xs uppercase shadow-[2px_2px_0px_0px_#000]">
              Shadow: [4px_4px_0px_0px_#000]
            </span>
          </div>
        </div>
      </div>
    </div>
  )

}

export default MainHome