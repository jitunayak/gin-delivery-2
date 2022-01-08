import { Layout, Text, RangeCalendar, Button } from '@ui-kitten/components';
import React from 'react';
import SubscriptionItems from '../components/SubscriptionItems';
import { SYMBOLS } from '../utilities/Constants';

export default function SubscriptionScreen({ navigation }) {
	const [range, setRange] = React.useState({});

	console.log(range);
	return (
		<Layout
			style={{
				flex: 1,
				justifyContent: 'flex-start',
				alignItems: 'center',
				paddingTop: SYMBOLS.STATUSBAR_HERIGHT,
			}}
		>
			<Text category={'h6'} style={{ paddingVertical: 10 }}>
				SUBSCRIPTION
			</Text>
			<SubscriptionItems />
			<RangeCalendar
				range={range}
				onSelect={(nextRange) => setRange(nextRange)}
			/>
			<Button
				status={'primary'}
				appearance={'outline'}
				style={{ marginTop: 30 }}
			>
				Place Subscription
			</Button>
		</Layout>
	);
}
