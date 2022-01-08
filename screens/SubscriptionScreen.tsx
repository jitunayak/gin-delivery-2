import {
	Layout,
	Text,
	RangeCalendar,
	Button,
	Calendar,
	CalendarRange,
} from '@ui-kitten/components';
import React, {
	useState,
	useCallback,
	useMemo,
	useRef,
	useEffect,
} from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import SubscriptionItems from '../components/SubscriptionItems';
import TimSchedule from '../components/TimSchedule';
import { COLORS, SYMBOLS } from '../utilities/Constants';
import BottomSheet from '@gorhom/bottom-sheet';

export default function SubscriptionScreen({ navigation }) {
	const [scheduledDeliveryTime, setScheduledDeliveryTime] = useState(null);
	const [range, setRange] = useState<CalendarRange<Date>>({});
	const [items, setItems] = useState([
		{
			id: '1',
			name: 'Milk',
			image: 'https://cdn-icons-png.flaticon.com/512/3500/3500270.png',
			isAvailable: true,
			items: ['Omfed', 'Moo Milk', 'Nandini'],
		},
		{
			id: '2',
			name: 'Juice',
			image: 'https://cdn-icons-png.flaticon.com/512/2442/2442251.png',
			isAvailable: true,
			items: ['Apple', 'Mix Fruits', 'Banana Shake'],
		},
		{
			id: '3',
			name: 'News Paper',
			image: 'https://cdn-icons-png.flaticon.com/512/2965/2965879.png',
			isAvailable: true,
			items: ['Suprabhat', 'Sambad', 'Dharitri', 'Times Of India'],
		},
	]);
	const [selectedIndex, setSelectedIndex] = useState('Select From DropDown');
	const [currentSelectedItem, setcurrentSelectedItem] = useState({
		id: items[0].id,
		items: items[0].items,
	});
	const bottomSheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ['10%', '30%', '50%'], []);
	const handleSheetChanges = useCallback((index: number) => {}, []);

	const checkIfAllDetailsAreCaptured = () => {
		let shouldShowBottomSheet = true;
		if (selectedIndex === null || selectedIndex === 'Select From DropDown') {
			alert('Please select a subscription');
			shouldShowBottomSheet = false;
		}
		if (range.startDate === undefined) {
			alert('Please select a date');
			shouldShowBottomSheet = false;
		}
		if (shouldShowBottomSheet) {
			bottomSheetRef.current.snapToIndex(2);
		}
		/**
		 *  TODO: Send the subscription to the server
		 */
	};

	const sendPayloadToServer = () => {
		const payload = {
			item: selectedIndex,
			dateRange: range,
			scheduledDeliveryTime: scheduledDeliveryTime,
		};
		alert(JSON.stringify(payload));
		console.log(payload);
	};

	useEffect(() => {
		bottomSheetRef.current.close();
		console.log(range);
		if (range.endDate !== undefined && range.endDate !== null) {
			// console.log('range is not null ', range.endDate);
			checkIfAllDetailsAreCaptured();
		}

		return () => {
			bottomSheetRef.current.close();
		};
	}, [range]);

	return (
		<Layout
			style={{
				flex: 1,
				justifyContent: 'flex-start',
				alignItems: 'center',
				paddingTop: SYMBOLS.STATUSBAR_HERIGHT,
				backgroundColor: COLORS.WHITE,
			}}
		>
			<Text category={'h6'} style={{ paddingVertical: 10 }}>
				SUBSCRIPTION
			</Text>
			<SubscriptionItems
				items={items}
				setItems={setItems}
				selectedIndex={selectedIndex}
				setSelectedIndex={setSelectedIndex}
				currentSelectedItem={currentSelectedItem}
				setcurrentSelectedItem={setcurrentSelectedItem}
			/>
			<RangeCalendar
				range={range}
				onSelect={(nextRange) => setRange(nextRange)}
			/>
			{/* <Button
				appearance={'outline'}
				onPress={() => checkIfAllDetailsAreCaptured()}
				style={{
					margin: 20,
				}}
			>
				Shedule Time
			</Button> */}
			<BottomSheet
				ref={bottomSheetRef}
				snapPoints={snapPoints}
				onChange={handleSheetChanges}
				backgroundStyle={{
					shadowRadius: 10,
					shadowColor: '#000',
					shadowOffset: { width: 0, height: 6 },
					shadowOpacity: 0.5,
				}}
			>
				<TimSchedule
					scheduledDeliveryTime={scheduledDeliveryTime}
					setScheduledDeliveryTime={setScheduledDeliveryTime}
				/>

				<Button
					onPress={() => sendPayloadToServer()}
					status={'primary'}
					appearance={'primary'}
					style={{ margin: 10 }}
					disabled={scheduledDeliveryTime === null}
				>
					Place Subscription
				</Button>
			</BottomSheet>
		</Layout>
	);
}
