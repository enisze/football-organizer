import TileLayer from "ol/layer/Tile";
import Map from "ol/Map";
import "ol/ol.css";
import OSM from "ol/source/OSM";
import View from "ol/View";
import type { FunctionComponent, PropsWithChildren } from "react";
import { useEffect, useRef, useState } from "react";

export const OrganizerMap: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [map, setMap] = useState<Map>();
  const mapElement = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map>();
  mapRef.current = map;

  useEffect(() => {
    const initialMap = new Map({
      target: mapElement.current ?? undefined,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 12,
      }),
    });
    setMap(initialMap);
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }} ref={mapElement}>
      {children}
    </div>
  );
};
