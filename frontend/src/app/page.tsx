'use client';
import LeafletMap from '@/components/leaflet-map';

export default function Home() {
	return (
		<LeafletMap
			style={{
				height: '100vh',
				width: '100vw',
			}}
			bounds={[
				[20.358, 122.934], // Southwest corner (approx)
				[45.551, 153.986], // Northeast corner (approx)
			]}
			center={[36.2048, 138.2529]}
			zoom={5}
			minZoom={5}
			scrollWheelZoom={false}
		>
			<div></div>
		</LeafletMap>
	);
}
