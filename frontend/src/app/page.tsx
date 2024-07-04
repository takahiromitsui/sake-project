'use client';
import { Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import LeafletMap from '@/components/leaflet-map';

export default function Home() {
	const markers: [number, number][] = [
		[35.6895, 139.6917], // Tokyo
		[34.6937, 135.5023], // Osaka
		[35.1815, 136.9066], // Nagoya
		[43.0686, 141.3508], // Sapporo
		[35.6894, 139.6917], // Tokyo (again)
	];
	const popups: string[] = [
		'Tokyo',
		'Osaka',
		'Nagoya',
		'Sapporo',
		'Tokyo (again)',
	];
	const iconURL = '/assets/marker-icon.png';

	const customIcon = new Icon({
		iconUrl: iconURL,
		iconSize: [38, 38],
	});
	// const createCustomClusterIcon = (cluster) => {
	// 	const count = cluster.getChildCount();
	// 	return new divIcon({
	// 		html: `<div class='cluster-icon>${count}</div>`,
	// 		className: 'cluster-marker-cluster',
	// 		iconSize: point(33,33, true),
	// 	});
	// }
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
			{markers.map((position, index) => (
				<Marker key={index} position={position} icon={customIcon}>
					<Popup>{popups[index]}</Popup>
				</Marker>
			))}
		</LeafletMap>
	);
}
