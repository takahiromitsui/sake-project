'use client';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import LeafletMap from '@/components/leaflet-map';
import dynamic from 'next/dynamic';
import { prefectures } from '@/lib/prefectures';
import { useState } from 'react';

export default function Home() {
	const [selectedPrefecture, setSelectedPrefecture] = useState<
		(typeof prefectures)[0] | null
	>(null);
	console.log(selectedPrefecture);
	const LazyMarkers = dynamic(
		async () => await import('@/components/markers'),
		{
			ssr: false,
		}
	);
	return (
		<div className='flex'>
			<div className='w-1/4  pt-4 pl-4 pr-4'>
				<Select onValueChange={setSelectedPrefecture}>
					<SelectTrigger className='w-[180px]'>
						<SelectValue placeholder='Select a location' />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Location</SelectLabel>
							{prefectures.map(prefecture => (
								<SelectItem key={prefecture.name} value={prefecture}>
									{prefecture.display}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
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
				maxZoom={10}
				scrollWheelZoom={false}
			>
				<LazyMarkers props={selectedPrefecture} />
			</LeafletMap>
		</div>
	);
}
