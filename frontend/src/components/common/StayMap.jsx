import { useEffect, useMemo, useState } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup } from "react-leaflet";
import OpenFreeMapLayer from "./OpenFreeMapLayer";

function buildMarker(label, active = false, single = false) {
  return L.divIcon({
    className: "tz-map-marker-shell",
    html: single
      ? `<div class="tz-map-pin${active ? " is-active" : ""}" aria-hidden="true"><span class="tz-map-pin-dot"></span></div>`
      : `<div class="tz-map-marker${active ? " is-active" : ""}"><span>${label}</span></div>`,
    iconSize: single ? [32, 44] : [104, 34],
    iconAnchor: single ? [16, 40] : [52, 17],
  });
}

export default function StayMap({ items, selectedId = null, height = 420, single = false, onReady = null }) {
  const [mapInstance, setMapInstance] = useState(null);

  const points = useMemo(
    () =>
      items
        .filter((item) => Number.isFinite(Number(item.latitude)) && Number.isFinite(Number(item.longitude)))
        .map((item) => ({
          ...item,
          latitude: Number(item.latitude),
          longitude: Number(item.longitude),
        })),
    [items]
  );

  if (!points.length) {
    return <div className="map-fallback">유효한 좌표가 없어 지도를 표시할 수 없습니다.</div>;
  }

  const focusedPoint = single ? points[0] : points.find((item) => item.id === selectedId) ?? null;

  const center = focusedPoint
    ? [focusedPoint.latitude, focusedPoint.longitude]
    : [points.reduce((sum, item) => sum + item.latitude, 0) / points.length, points.reduce((sum, item) => sum + item.longitude, 0) / points.length];

  const zoom = focusedPoint ? (single ? 13 : 11) : 7.2;

  useEffect(() => {
    if (!mapInstance) return;
    mapInstance.invalidateSize();
  }, [mapInstance, points.length, single]);

  return (
    <div className="stay-map-wrap">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom
        style={{ width: "100%", height: typeof height === "number" ? `${height}px` : height }}
        zoomControl={false}
        whenReady={(event) => {
          setMapInstance(event.target);
          onReady?.(event.target);
        }}
      >
        <OpenFreeMapLayer />
        {points.map((item) => (
          <Marker
            key={item.id}
            position={[item.latitude, item.longitude]}
            icon={buildMarker(single ? "숙소 위치" : item.price, item.id === selectedId, single)}
          >
            <Popup>
              <strong>{item.name}</strong>
              <br />
              {item.region} · {item.district}
              <br />
              {single ? item.address : item.price}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="stay-map-controls">
        <button type="button" className="stay-map-control" onClick={() => mapInstance?.zoomIn()} aria-label="지도 확대">+</button>
        <button type="button" className="stay-map-control" onClick={() => mapInstance?.zoomOut()} aria-label="지도 축소">-</button>
      </div>
    </div>
  );
}
