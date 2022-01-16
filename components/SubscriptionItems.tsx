import {
	Button,
	Layout,
	Select,
	SelectItem,
	Text,
} from '@ui-kitten/components';
import React, { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';

import { COLORS } from '../utilities/Constants';

export default function SubscriptionItems({
	items,
	setItems,
	selectedIndex,
	setSelectedIndex,
	currentSelectedItem,
	setcurrentSelectedItem,
}) {
	return (
		<>
			<Layout style={{ flexDirection: 'row' }}>
				{items.map((item, index) => {
					return (
						<TouchableOpacity
							key={item.id}
							onPress={() => {
								setcurrentSelectedItem({ id: item.id, items: item.items });
								setSelectedIndex(item.items[0]);
							}}
							style={{
								width: 80,
								height: 80,
								justifyContent: 'center',
								alignItems: 'center',
								padding: 10,
								margin: 6,
								borderRadius: 6,
								backgroundColor:
									currentSelectedItem.id === item.id
										? COLORS.ACCENT_LIGHT
										: COLORS.WHITE,
							}}
						>
							<Image
								source={{ uri: item.image }}
								style={{ width: 40, height: 40 }}
							/>
							<Text category={'c2'} style={{ paddingTop: 6 }}>
								{item.name}
							</Text>
						</TouchableOpacity>
					);
				})}
			</Layout>
			<Layout
				style={{
					flexDirection: 'row',
					alignItems: 'center',
				}}
			>
				<Select
					style={{ width: 200, flex: 1, marginLeft: 30, padding: 10 }}
					onSelect={(index) => {
						setSelectedIndex(currentSelectedItem.items[index.row]);
					}}
				>
					{currentSelectedItem.items.map((item, index) => {
						return <SelectItem title={item} key={index} />;
					})}
				</Select>
				<Button
					status={'primary'}
					appearance={'ghost'}
					style={{ paddingLeft: 10, flex: 1 }}
				>
					{selectedIndex}
				</Button>
			</Layout>
		</>
	);
}
