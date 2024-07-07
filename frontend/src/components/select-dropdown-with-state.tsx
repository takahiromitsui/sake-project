'use client';
import { useState } from 'react';
import SelectDropdown from '@/components/select-dropdown';
import LeafletMap from '@/components/leaflet-map';
import Markers from '@/components/markers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function SelectDropdownWithState() {
	const queryClient = new QueryClient();
	const [selectedPrefecture, setSelectedPrefecture] = useState<string | null>(
		null
	);

	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools />
			<div className='flex'>
				<div className='w-1/4 pt-4 pl-4 pr-4'>
					<SelectDropdown onSelect={setSelectedPrefecture} />
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
					{selectedPrefecture === null ? null : (
						<Markers props={selectedPrefecture} />
					)}
				</LeafletMap>
			</div>
		</QueryClientProvider>
	);
}
