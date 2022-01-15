import { useNavigation } from '@react-navigation/native';
import { Button, Layout, Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { Pressable, TouchableOpacity } from 'react-native';
import { API, COLORS } from '../utilities/Constants';

export default function SelectAddress() {
	const [address, setAddress] = useState([]);
	const [refreshing, setRefreshing] = useState(false);
	const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);

	const navigation = useNavigation();

	const fetchAddress = async () => {
		return await fetch(`${API.BASE_URL}/users/${API.USER_ID}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: API.JWT_TOKEN,
				'api-key': API.API_KEY,
			},
		});
	};
	useEffect(() => {
		setRefreshing(true);
		fetchAddress().then((res) => {
			res.json().then((data) => {
				setAddress(data.address);
				//console.log(data.address);
				setRefreshing(false);
			});
		});
		return () => {};
	}, []);

	return (
		<Layout style={{ margin: 10 }}>
			<Text category={'label'} style={{ padding: 10 }}>
				Select Address
			</Text>
			<Layout style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
				{!refreshing &&
					address.map((item, index) => {
						//console.log(item, index);
						return (
							<Pressable
								key={index}
								onPress={() => {
									setCurrentSelectedAddress(item);
								}}
								style={{
									padding: 10,
									backgroundColor:
										currentSelectedAddress !== null &&
										currentSelectedAddress._id === item._id
											? COLORS.LIGHT_BLUE
											: 'white',
									borderRadius: 4,
									borderColor: COLORS.LIGHT_BLUE,
									borderWidth: 1,
									height: 120,
									width: 160,
									marginRight: 20,
								}}
							>
								<Text category={'s2'} style={{ paddingVertical: 6 }}>
									{item.name}
								</Text>
								<Text category={'p2'}>{item.address1}</Text>
								<Text category={'p2'}>{item.address2}</Text>
								<Text category={'p2'} style={{ paddingVertical: 6 }}>
									{item.phone}
								</Text>
							</Pressable>
						);
					})}
			</Layout>
			<Layout style={{ flexDirection: 'row', flex: 2, paddingVertical: 10 }}>
				<Button
					appearance={'outline'}
					status={'info'}
					style={{ flex: 1, margin: 10 }}
					onPress={() =>
						navigation.navigate('Address', {
							allAddresses: address,
							currentSelectedAddress: currentSelectedAddress,
						})
					}
					disabled={currentSelectedAddress === null}
				>
					Edit
				</Button>
				<Button
					appearance={'filled'}
					status={'info'}
					style={{ flex: 1, margin: 10 }}
					onPress={() =>
						navigation.navigate('Address', {
							allAddresses: address,
							currentSelectedAddress: null,
						})
					}
				>
					Add
				</Button>
			</Layout>
		</Layout>
	);
}
