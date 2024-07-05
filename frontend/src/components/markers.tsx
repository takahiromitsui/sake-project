import { Marker, Popup } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import MarkerCluster from '@/components/marker-cluster';

export default async function Markers() {
	const place = {
		name: 'hokkaido',
		position: [43.0686, 141.3508] as [number, number],
	};

	const response = await fetch(`http://localhost:8000/brands/${place.name}`);
	const { brands } = await response.json();

	const iconURL = '/assets/marker-icon.png';

	const customIcon = new Icon({
		iconUrl: iconURL,
		iconSize: [38, 38],
	});

	return (
		<MarkerCluster>
			{brands
				? brands.map((brand: any, index: number) => (
						<Marker key={index} position={place.position} icon={customIcon}>
							<Popup>{brand.name}</Popup>
						</Marker>
				  ))
				: null}
		</MarkerCluster>
	);
}
