// @ts-expect-error Missing type definitions
import BaseMarkerCluster from '@changey/react-leaflet-markercluster';
import { divIcon, point } from 'leaflet';

const createClusterCustomIcon = (cluster: any) => {
	return divIcon({
		html: `<span>${cluster.getChildCount()}</span>`,
		className:
			'bg-[#e74c3c] bg-opacity-100 text-white font-bold !flex items-center justify-center rounded-3xl border-white border-4 border-opacity-50',
		iconSize: point(40, 40, true),
	});
};

export default function MarkerCluster({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<BaseMarkerCluster
			iconCreateFunction={createClusterCustomIcon}
			showCoverageOnHover={false}
		>
			{children}
		</BaseMarkerCluster>
	);
}
