import {
	Layout,
	Text,
	RangeCalendar,
	Button,
	Calendar,
	CalendarRange,
	RadioGroup,
	Radio,
	CheckBox,
	Icon,
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
import { Ionicons } from '@expo/vector-icons';
export default function SubscriptionScreen({ navigation }) {
	const [checked, setChecked] = React.useState(true);

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
	const [selectedPayment, setSelectedPayment] = React.useState(1);
	const bottomSheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ['10%', '30%', '50%'], []);
	const handleSheetChanges = useCallback((index: number) => {}, []);
	const showToast = () => {
		console.log('showToast');
	};
	const checkIfAllDetailsAreCaptured = () => {
		let shouldShowBottomSheet = true;
		if (selectedIndex === null || selectedIndex === 'Select From DropDown') {
			//showToast();
			//bottomSheetRef.current.close();
			alert('Please select a subscription');
			shouldShowBottomSheet = false;
			return false;
		}
		if (range.startDate === undefined) {
			// showToast();
			// bottomSheetRef.current.close();
			alert('Please select a date');
			shouldShowBottomSheet = false;
			return false;
		}
		if (range.startDate < new Date()) {
			//showToast();
			alert('Order cannot be placed in past');
			shouldShowBottomSheet = false;
			return false;
		}
		if (shouldShowBottomSheet) {
			bottomSheetRef.current.snapToIndex(2);
			return true;
		}
		/**
		 *  TODO: Send the subscription to the server
		 */
	};

	const sendPayloadToServer = () => {
		const shoudlPay = checkIfAllDetailsAreCaptured();
		if (shoudlPay) {
			const payload = {
				item: selectedIndex,
				dateRange: range,
				scheduledDeliveryTime: scheduledDeliveryTime,
			};
			alert(JSON.stringify(payload));
			console.log(payload);
		}
	};

	useEffect(() => {
		bottomSheetRef.current.close();
		console.log(range);
		if (range.endDate !== undefined && range.endDate !== null) {
			// console.log('range is not null ', range.endDate);
			checkIfAllDetailsAreCaptured();
		}

		return () => {};
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
			{selectedIndex === null ||
			selectedIndex === 'Select From DropDown' ? null : (
				<RangeCalendar
					range={range}
					onSelect={(nextRange) => setRange(nextRange)}
				/>
			)}
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
					shadowRadius: 12,
					shadowColor: '#000',
					shadowOffset: { width: 0, height: 6 },
					shadowOpacity: 0.5,
				}}
			>
				<TimSchedule
					scheduledDeliveryTime={scheduledDeliveryTime}
					setScheduledDeliveryTime={setScheduledDeliveryTime}
				/>

				<RadioGroup
					selectedIndex={selectedPayment}
					onChange={(index) => setSelectedPayment(index)}
					style={{ flexDirection: 'row', justifyContent: 'space-around' }}
				>
					<Radio>Cash</Radio>
					<Ionicons name="ios-cash-outline" size={24} color="gray" />
					<Radio>Card</Radio>
					<Ionicons name="card-outline" size={24} color="gray" />
					<Radio>UPI</Radio>
					<Ionicons name="card" size={24} color="gray" />
				</RadioGroup>
				{/* <CheckBox
					style={{ marginHorizontal: 10, marginTop: 20 }}
					checked={checked}
					onChange={(nextChecked) => setChecked(nextChecked)}
				>
					{`Terms & Conditions`}
				</CheckBox> */}
				<Button
					onPress={() => sendPayloadToServer()}
					status={'danger'}
					style={{
						margin: 10,
						backgroundColor: scheduledDeliveryTime ? COLORS.BLACK : COLORS.GRAY,
						borderColor: COLORS.BLACK,
					}}
					disabled={scheduledDeliveryTime === null}
					accessoryRight={<Icon name={'arrow-forward'} />}
				>
					Pay To Subscribe
				</Button>
			</BottomSheet>
		</Layout>
	);
}
