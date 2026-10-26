import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useHomeStore } from '../../store/home.store';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MainHome: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);
  const [lng, setLng] = useState<number>(118.0148);
  const [lat, setLat] = useState<number>(-2.5489);
  const [zoom, setZoom] = useState<number>(5);

  const {
    error,
    isLoading,
    getAllPlaces,
    placeData,
    setParamsPlace,
    paramsPlace,
    setPaginationPlace,
    paginationPlace,
  } = useHomeStore();

  useEffect(() => {
    getAllPlaces({ page: 1, size: 10, search: "" });
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    mapRef.current.on('move', () => {
      if (!mapRef.current) return;
      const center = mapRef.current.getCenter();
      setLng(Number(center.lng.toFixed(4)));
      setLat(Number(center.lat.toFixed(4)));
      setZoom(Number(mapRef.current.getZoom().toFixed(2)));
    });

    mapRef.current.on('load', () => {
      setIsMapLoaded(true);
    });

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isMapLoaded) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    const features = placeData?.data?.features || [];
    if (!features || features.length === 0) return;

    const bounds = new mapboxgl.LngLatBounds();

    features.forEach((feature) => {
      if (!feature.geometry || feature.geometry.type !== 'Point') return;
      const [lon, latitude] = feature.geometry.coordinates;
      if (typeof lon !== 'number' || typeof latitude !== 'number') return;

      const popupHtml = `
        <div style="font-family: inherit; padding: 4px; color: #000; min-width: 180px;">
          <div style="background-color: #FACC15; border: 2px solid black; padding: 2px 6px; font-weight: 900; font-size: 10px; text-transform: uppercase; display: inline-block; box-shadow: 2px 2px 0px 0px #000; margin-bottom: 6px;">
            ${feature.properties?.nama_kabupaten || 'Wilayah'}
          </div>
          <h3 style="font-weight: 900; font-size: 14px; text-transform: uppercase; margin: 0 0 4px 0; color: #000;">
            ${feature.properties?.name_place || 'Tanpa Nama'}
          </h3>
          ${feature.properties?.nama_provinsi
          ? `<p style="font-size: 11px; font-weight: 700; color: #4B5563; margin: 0 0 4px 0;">📍 ${feature.properties.nama_provinsi}</p>`
          : ''
        }
          ${feature.properties?.description
          ? `<p style="font-size: 11px; color: #1F2937; margin: 4px 0; line-height: 1.4;">${feature.properties.description}</p>`
          : ''
        }
          <div style="font-size: 10px; font-weight: 600; color: #6B7280; margin-top: 6px; font-family: monospace; border-top: 1px dashed #D1D5DB; padding-top: 4px;">
            Koordinat: ${latitude.toFixed(4)}, ${lon.toFixed(4)}
          </div>
        </div>
      `;

      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: true,
        closeOnClick: false,
        maxWidth: '280px',
      }).setHTML(popupHtml);

      const marker = new mapboxgl.Marker({
        color: '#E11D48',
      })
        .setLngLat([lon, latitude])
        .setPopup(popup)
        .addTo(map);

      markersRef.current.push(marker);
      bounds.extend([lon, latitude]);
    });

    if (markersRef.current.length > 0) {
      if (markersRef.current.length === 1) {
        const [lon, latitude] = features[0].geometry.coordinates;
        map.flyTo({
          center: [lon, latitude],
          zoom: 12,
          essential: true,
        });
      } else {
        map.fitBounds(bounds, {
          padding: 60,
          maxZoom: 14,
          duration: 1000,
        });
      }
    }
  }, [placeData, isMapLoaded]);

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