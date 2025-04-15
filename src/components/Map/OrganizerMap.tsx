'use client'

import { Feature } from 'ol'
import Map from 'ol/Map'
import View from 'ol/View'
import { Point } from 'ol/geom'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import 'ol/ol.css'
import { fromLonLat } from 'ol/proj'
import BingMaps from 'ol/source/BingMaps.js'
import VectorSource from 'ol/source/Vector'
import Icon from 'ol/style/Icon'
import Style from 'ol/style/Style'
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
			'<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><path fill="#FF0000" d="M128 16a88.1 88.1 0 0 0-88 88c0 75.3 80 132.17 83.41 134.55a8 8 0 0 0 9.18 0C136 236.17 216 179.3 216 104a88.1 88.1 0 0 0-88-88Zm0 56a32 32 0 1 1-32 32a32 32 0 0 1 32-32Z"/></svg>'
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
						source: new BingMaps({
							placeholderTiles: true,
							key: 'AiUxVpnsyLiaeAyT-GvCpGCpzr7GcKp3rQBIjFBcSbS1SGbtgcuumF05dahBBNcz',
							imagerySet: 'RoadOnDemand',
						}),
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
