'use client';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

export default function Home() {
	return (
		<MapContainer
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
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
			{/* <Marker position={[51.505, -0.09]}>
				<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
				</Popup>
			</Marker> */}
		</MapContainer>
	);
}
