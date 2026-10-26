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
    getAllPlaces,
    placeData,
  } = useHomeStore();

  useEffect(() => {
    getAllPlaces({ page: 1, size: 200, search: "" });
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

    const features = placeData?.data?.features || [];
    if (!features || features.length === 0) return;

    const sourceId = 'places-source';
    const clusterLayerId = 'clusters';
    const countLayerId = 'cluster-count';
    const unclusteredLayerId = 'unclustered-point';

    const geoJsonData: GeoJSON.FeatureCollection<GeoJSON.Point> = {
      type: 'FeatureCollection',
      features: features.filter((f) =>
        f.geometry && f.geometry.type === 'Point' &&
        typeof f.geometry.coordinates[0] === 'number' &&
        typeof f.geometry.coordinates[1] === 'number'
      )
    };

    if (map.getSource(sourceId)) {
      (map.getSource(sourceId) as mapboxgl.GeoJSONSource).setData(geoJsonData);
    } else {
      map.addSource(sourceId, {
        type: 'geojson',
        data: geoJsonData,
        cluster: true,
        clusterMaxZoom: 15,
        clusterRadius: 50
      });

      map.addLayer({
        id: clusterLayerId,
        type: 'circle',
        source: sourceId,
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#FDA4AF', 10,
            '#FB7185', 30,
            '#E11D48',
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            15, 10,
            20, 30,
            25
          ],
          'circle-stroke-width': 2,
          'circle-stroke-color': '#000000',
        }
      });

      map.addLayer({
        id: countLayerId,
        type: 'symbol',
        source: sourceId,
        filter: ['has', 'point_count'],
        layout: {
          'text-field': ['get', 'point_count_abbreviated'],
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12,
        },
        paint: {
          'text-color': '#000000',
        }
      });

      map.addLayer({
        id: unclusteredLayerId,
        type: 'circle',
        source: sourceId,
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': '#E11D48',
          'circle-radius': 8,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#000000',
        },
      });

      map.on('click', clusterLayerId, (e) => {
        const features = map.queryRenderedFeatures(e.point, { layers: [clusterLayerId] });
        if (!features.length) return;

        const clusterFeature = features[0];
        const clusterId = clusterFeature.properties?.cluster_id;
        if (clusterId === undefined || clusterId === null) return;

        (map.getSource(sourceId) as mapboxgl.GeoJSONSource).getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err || zoom == null) return;
          if (clusterFeature.geometry.type === 'Point') {
            map.easeTo({
              center: clusterFeature.geometry.coordinates as [number, number],
              zoom: zoom,
            });
          }
        });
      });

      map.on('click', unclusteredLayerId, (e) => {
        if (!e.features || !e.features[0]) return;
        const feature = e.features[0];
        if (feature.geometry.type !== 'Point') return;

        const coordinates = (feature.geometry.coordinates as [number, number]).slice();
        const props = (feature.properties || {}) as Record<string, any>;

        const popupHtml = `
        <div style="font-family: inherit; padding: 4px; color: #000; min-width: 180px;">
          <div style="background-color: #FACC15; border: 2px solid black; padding: 2px 6px; font-weight: 900; font-size: 10px; text-transform: uppercase; display: inline-block; box-shadow: 2px 2px 0px 0px #000; margin-bottom: 6px;">
            ${props.nama_kabupaten || 'Wilayah'}
          </div>
          <h3 style="font-weight: 900; font-size: 14px; text-transform: uppercase; margin: 0 0 4px 0; color: #000;">
            ${props.name_place || 'Tanpa Nama'}
          </h3>
          ${props.nama_provinsi ? `<p style="font-size: 11px; font-weight: 700; color: #4B5563; margin: 0 0 4px 0;">📍 ${props.nama_provinsi}</p>` : ''}
          ${props.description ? `<p style="font-size: 11px; color: #1F2937; margin: 4px 0; line-height: 1.4;">${props.description}</p>` : ''}
          <div style="font-size: 10px; font-weight: 600; color: #6B7280; margin-top: 6px; font-family: monospace; border-top: 1px dashed #D1D5DB; padding-top: 4px;">
            Koordinat: ${coordinates[1].toFixed(4)}, ${coordinates[0].toFixed(4)}
          </div>
        </div>
      `;

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup({
          offset: 15,
          closeButton: true,
          closeOnClick: true,
          maxWidth: '280px',
        })
          .setLngLat(coordinates as [number, number])
          .setHTML(popupHtml)
          .addTo(map);
      });

      map.on('mouseenter', clusterLayerId, () => { map.getCanvas().style.cursor = 'pointer'; });
      map.on('mouseleave', clusterLayerId, () => { map.getCanvas().style.cursor = ''; });
      map.on('mouseenter', unclusteredLayerId, () => { map.getCanvas().style.cursor = 'pointer'; });
      map.on('mouseleave', unclusteredLayerId, () => { map.getCanvas().style.cursor = ''; });
    }
    const bounds = new mapboxgl.LngLatBounds();
    geoJsonData.features.forEach((feature) => {
      bounds.extend(feature.geometry.coordinates as [number, number]);
    });

    if (geoJsonData.features.length > 0) {
      if (geoJsonData.features.length === 1) {
        map.flyTo({
          center: geoJsonData.features[0].geometry.coordinates as [number, number],
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

    return () => {
      if (mapRef.current && mapRef.current.getStyle()) {
        if (mapRef.current.getLayer(clusterLayerId)) mapRef.current.removeLayer(clusterLayerId);
        if (mapRef.current.getLayer(countLayerId)) mapRef.current.removeLayer(countLayerId);
        if (mapRef.current.getLayer(unclusteredLayerId)) mapRef.current.removeLayer(unclusteredLayerId);
        if (mapRef.current.getSource(sourceId)) mapRef.current.removeSource(sourceId);
      }
    };

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