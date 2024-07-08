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
		enabled: !!prefecture?.name,
		queryKey: ['brands', prefecture?.name],
		queryFn: async () => await getBrands(prefecture.name),
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
						<div className='bg-white rounded-lg shadow-lg p-6'>
							<h1 className='text-xl font-bold mb-3 capitalize'>
								{brand.name} ( {brand.en} )
							</h1>
							<p className='text-gray-700 capitalize'>
								Brewery: {brand.breweryDetails.name}
								<br />
								Area: {brand.breweryDetails.areaDetails.en}
							</p>
						</div>
					</Popup>
				</Marker>
			))}
		</MarkerCluster>
	);
}
