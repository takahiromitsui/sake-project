'use client';
import { Marker, Popup } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import MarkerCluster from '@/components/marker-cluster';
import { prefectures } from '@/lib/prefectures';
import { useQuery } from '@tanstack/react-query';
import { getBrands } from '@/api/brands';

type Props = {
	props: null | (typeof prefectures)[0];
};

export default function Markers({ props }: Props) {
	const { status, data: brands } = useQuery({
		queryKey: ['brands', props?.name],
		queryFn: async () => {
			if (props?.name) {
				return await getBrands(props.name);
			}
		},
	});

	const iconURL = '/assets/marker-icon.png';

	const customIcon = new Icon({
		iconUrl: iconURL,
		iconSize: [38, 38],
	});

	if (status === 'pending' || status === 'error' || !brands || !props) {
		return <></>;
	}

	return (
		<MarkerCluster>
			{brands.map(brand => (
				<Marker
					key={brand.id}
					position={
						[props.coordinate[0], props.coordinate[1]] as [number, number]
					}
					icon={customIcon}
				>
					<Popup>
						<div>
							<h1>{brand.name}</h1>
							<p>{brand.brewery.name}</p>
						</div>
					</Popup>
				</Marker>
			))}
		</MarkerCluster>
	);
}
