'use client';
import dynamic from 'next/dynamic';

export default function Home() {
	const LazyMap = dynamic(() => import('@/components/leaflet-map'), {
		ssr: false,
	});
	const LazyMarkers = dynamic(() => import('@/components/markers'), {
		ssr: false,
	});
	return (
		<LazyMap
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
			maxZoom={10}
			scrollWheelZoom={false}
		>
			<LazyMarkers />
		</LazyMap>
	);
}
