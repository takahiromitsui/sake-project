import { MapOptions, LatLngBoundsExpression } from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

type Props = {
	style: React.CSSProperties;
	bounds?: LatLngBoundsExpression;
	children: React.ReactNode;
} & MapOptions;

export default function LeafletMap({
	style,
	bounds,
	children,
	...options
}: Props) {
	return (
		<MapContainer style={style} bounds={bounds} {...options}>
			{children}
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
		</MapContainer>
	);
}
