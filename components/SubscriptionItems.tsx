import {
	Layout,
	Text,
	IndexPath,
	SelectItem,
	Select,
	Button,
} from '@ui-kitten/components';
import React, { useState } from 'react';
import { Image, Pressable } from 'react-native';
import { COLORS } from '../utilities/Constants';

export default function SubscriptionItems() {
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
	const [selectedIndex, setSelectedIndex] = React.useState('Select');

	const [currentSelectedItem, setcurrentSelectedItem] = useState({
		id: items[0].id,
		items: items[0].items,
	});
	return (
		<>
			<Layout style={{ flexDirection: 'row' }}>
				{items.map((item, index) => {
					return (
						<Pressable
							key={item.id}
							onPress={() => {
								setcurrentSelectedItem({ id: item.id, items: item.items });
								setSelectedIndex(item.items[0]);
							}}
							style={{
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
								style={{ width: 60, height: 60 }}
							/>
							<Text>{item.name}</Text>
						</Pressable>
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
