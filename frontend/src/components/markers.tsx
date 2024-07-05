import { Marker, Popup } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import MarkerCluster from '@/components/marker-cluster';
import { prefectures } from '@/lib/prefectures';

type Props = {
	props: null | (typeof prefectures)[0];
};

export default async function Markers({ props }: Props) {
	const place = {
		name: 'hokkaido',
		position: [43.0686, 141.3508] as [number, number],
	};

	const response = await fetch(`http://localhost:8000/brands/${props?.name}`);
	const { brands } = await response.json();

	const iconURL = '/assets/marker-icon.png';

	const customIcon = new Icon({
		iconUrl: iconURL,
		iconSize: [38, 38],
	});

	return (
		<MarkerCluster>
			{brands && props?.coordinate
				? brands.map((brand: any, index: number) => (
						<Marker
							key={index}
							position={
								[props.coordinate[0], props.coordinate[1]] as [number, number]
							}
							icon={customIcon}
						>
							<Popup>{brand.name}</Popup>
						</Marker>
				  ))
				: null}
		</MarkerCluster>
	);
}
