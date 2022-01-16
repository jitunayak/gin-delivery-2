import { Layout, Text } from '@ui-kitten/components';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { COLORS } from '../utilities/Constants';

export default function TimSchedule({
	scheduledDeliveryTime,
	setScheduledDeliveryTime,
}) {
	const currenttime = new Date();

	const times = [
		{ time: '08:00 AM (Morning) ', hour: 8 },
		{ time: '10:00 AM (Morning) ', hour: 10 },
		{ time: '04:00 PM (Afternoon)', hour: 16 },
		{ time: '05:00 PM (Afternoon)', hour: 17 },
		{ time: '06:00 PM (Evening)', hour: 18 },
	];

	const checkAvailability = (time) => {
		return currenttime.getHours() - 10 < time ? true : false;
	};
	return (
		<Layout
			style={{
				margin: 10,
				padding: 10,
			}}
		>
			<Text
				category={'h6'}
				style={{ marginVertical: 6, textAlign: 'left', marginBottom: 10 }}
			>
				Choose your Schedule
			</Text>
			<Layout style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
				{times.map((time, index) => {
					return (
						<TouchableOpacity
							key={index}
							style={{
								margin: 2,
								flexDirection: 'row',
								justifyContent: 'space-between',
								backgroundColor:
									scheduledDeliveryTime === time.time
										? COLORS.ACCENT_LIGHT
										: checkAvailability(time.hour)
										? COLORS.LIGHT_GREY
										: COLORS.LIGHT_GREY,
								padding: 16,
								borderRadius: 4,
							}}
							disabled={!checkAvailability(time.hour)}
							onPress={() => {
								setScheduledDeliveryTime(time.time);
							}}
						>
							<Text
								category={'c2'}
								style={{
									color:
										scheduledDeliveryTime === time.time
											? COLORS.ACCENT
											: checkAvailability(time.hour)
											? COLORS.BLACK
											: COLORS.GREY,
								}}
							>
								{time.time}
							</Text>
							<Text
								category={'c2'}
								style={{
									textAlign: 'right',
									color:
										scheduledDeliveryTime === time.time
											? COLORS.WHITE
											: checkAvailability(time.hour)
											? COLORS.ACCENT
											: COLORS.GREY,
								}}
							>
								{checkAvailability(time.hour) ? '' : 'N/A'}
							</Text>
						</TouchableOpacity>
					);
				})}
			</Layout>
		</Layout>
	);
}
