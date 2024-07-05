'use client';
import { Marker, Popup } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import MarkerCluster from '@/components/marker-cluster';
import { prefectureMap } from '@/lib/prefectures';
import { useQuery } from '@tanstack/react-query';
import { getBrands } from '@/api/brands';

type Props = {
	props: string;
};

export default function Markers({ props }: Props) {
	const prefecture = prefectureMap[props as keyof typeof prefectureMap];
	const { status, data: brands } = useQuery({
		queryKey: ['brands', prefecture?.name],
		queryFn: async () => {
			if (!prefecture?.name) return;
			return await getBrands(prefecture.name);
		},
	});

	const iconURL = '/assets/marker-icon.png';

	const customIcon = new Icon({
		iconUrl: iconURL,
		iconSize: [38, 38],
	});

	if (
		status === 'pending' ||
		status === 'error' ||
		!brands ||
		!props ||
		!prefecture.coordinate[0] ||
		!prefecture.coordinate[1]
	) {
		return <></>;
	}

	return (
		<MarkerCluster>
			{brands.map(brand => (
				<Marker
					key={brand.id}
					position={
						[prefecture.coordinate[0], prefecture.coordinate[1]] as [
							number,
							number
						]
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
