import { useNavigation } from '@react-navigation/native';
import { Button, Layout, Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { Dimensions, Pressable, TouchableOpacity } from 'react-native';
import { API, COLORS } from '../utilities/Constants';
import { Feather } from '@expo/vector-icons';

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
			<Text category={'h6'} style={{ padding: 10 }}>
				Select Address
			</Text>
			<Layout style={{ flexDirection: 'column', paddingHorizontal: 10 }}>
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
									marginTop: 10,
									borderColor:
										currentSelectedAddress !== null &&
										currentSelectedAddress._id === item._id
											? '#1B40AC'
											: COLORS.LIGHT_GREY,

									borderRadius: 4,
									// borderColor: COLORS.LIGHT_BLUE,
									borderWidth: 2,
									width: Dimensions.get('screen').width - 40,
								}}
							>
								<Layout
									style={{
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									<Layout>
										<Text category={'label'} style={{ paddingVertical: 6 }}>
											{item.name}
										</Text>
										<Text category={'p2'}>
											{item.address1},{item.address2},{item.phone}
										</Text>
									</Layout>

									<Feather
										name="edit"
										size={24}
										color={
											currentSelectedAddress !== null &&
											currentSelectedAddress._id === item._id
												? '#1B40AC'
												: COLORS.LIGHT_GREY
										}
										onPress={() =>
											navigation.navigate('Address', {
												allAddresses: address,
												currentSelectedAddress: currentSelectedAddress,
											})
										}
									/>
								</Layout>
							</Pressable>
						);
					})}
			</Layout>
			<Layout style={{ flexDirection: 'row', flex: 1, paddingVertical: 10 }}>
				{/* <Button
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
				</Button> */}
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
					Add New Address
				</Button>
			</Layout>
		</Layout>
	);
}
