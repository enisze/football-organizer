'use client'

import { Feature } from 'ol'
import { Point } from 'ol/geom'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import Map from 'ol/Map'
import 'ol/ol.css'
import { fromLonLat } from 'ol/proj'
import OSM from 'ol/source/OSM'
import VectorSource from 'ol/source/Vector'
import Icon from 'ol/style/Icon'
import Style from 'ol/style/Style'
import View from 'ol/View'
import type { FunctionComponent, PropsWithChildren } from 'react'
import { useEffect, useRef } from 'react'

export type OrganizerMapProps = PropsWithChildren<{ coordinates: number[] }>

export const OrganizerMap: FunctionComponent<OrganizerMapProps> = ({
  children,
  coordinates,
}) => {
  const transformedCoordinates = fromLonLat(coordinates)

  const mapElement = useRef<HTMLDivElement>(null)
  const mapRef = useRef<Map>()

  useEffect(() => {
    const point = new Point(transformedCoordinates)
    const feature = new Feature({ geometry: point })
    const drawSource = new VectorSource({ wrapX: false, features: [feature] })

    const svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="320" height="512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M320 144c0 79.5-64.5 144-144 144S32 223.5 32 144S96.5 0 176 0s144 64.5 144 144zM176 80c8.8 0 16-7.2 16-16s-7.2-16-16-16c-53 0-96 43-96 96c0 8.8 7.2 16 16 16s16-7.2 16-16c0-35.3 28.7-64 64-64zM144 480V317.1c10.4 1.9 21.1 2.9 32 2.9s21.6-1 32-2.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32z"/></svg>'
    const src = 'data:image/svg+xml,' + encodeURIComponent(svg)

    const style = new Style({
      image: new Icon({
        opacity: 1,
        src,
        scale: 0.08,
      }),
    })

    if (mapElement.current && !mapRef.current) {
      mapRef.current = new Map({
        target: mapElement.current ?? undefined,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          new VectorLayer({
            source: drawSource,
            style,
          }),
        ],
        view: new View({
          center: transformedCoordinates,
          zoom: 14,
        }),
      })
    }
  }, [transformedCoordinates])

  return (
    <div className={'absolute top-0 h-full w-full'} ref={mapElement}>
      {children}
    </div>
  )
}
