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
import { prefectureDisplays } from '@/lib/prefectures';

export default function SelectDropdown({
	onSelect,
}: {
	onSelect: (value: string) => void;
}) {
	return (
		<Select onValueChange={onSelect}>
			<SelectTrigger className='w-[180px]'>
				<SelectValue placeholder='Select a location' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Location</SelectLabel>
					{prefectureDisplays.map(display => (
						<SelectItem key={display} value={display}>
							{display}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
