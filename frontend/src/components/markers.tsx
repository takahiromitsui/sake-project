import { Marker, Popup } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import MarkerCluster from '@/components/marker-cluster';

export default async function Markers() {
	const response = await fetch('http://localhost:8000/brands/hokkaido');
	const data = await response.json();
	console.log(data);

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

	return (
		<MarkerCluster>
			{markers.map((position, index) => (
				<Marker key={index} position={position} icon={customIcon}>
					<Popup>{popups[index]}</Popup>
				</Marker>
			))}
		</MarkerCluster>
	);
}
