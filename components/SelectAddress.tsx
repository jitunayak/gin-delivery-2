import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Button, Layout, Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { useDispatch } from 'react-redux';

import { API, COLORS, loadConstacts } from '../utilities/Constants';

export default function SelectAddress({ navigation }) {
	const [address, setAddress] = useState([]);
	const [refreshing, setRefreshing] = useState(false);
	const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);

	// const navigation = useNavigation();
	const dispatch = useDispatch();

	useEffect(() => {
		async () => {
			await loadConstacts();
		};
		const unsubscribe = navigation.addListener('focus', () => {
			updateAddress();
		});

		return unsubscribe;
	}, [navigation]);

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

	const updateAddress = async () => {
		fetchAddress().then((res) => {
			res.json().then((data) => {
				console.log(data.address);
				(data.address !== undefined && data.address.length) > 0 &&
					setAddress(data.address);
				//console.log(data.address);
				setRefreshing(false);
			});
		});
	};

	useEffect(() => {
		setRefreshing(true);
		updateAddress();
	}, []);

	return (
		<Layout style={{ margin: 6 }}>
			<Layout
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Text category={'h6'} style={{ padding: 10 }}>
					Select Address
				</Text>
				<Text status={'info'} onPress={async () => await updateAddress()}>
					Refresh
				</Text>
			</Layout>
			<Layout style={{ flexDirection: 'column', paddingHorizontal: 10 }}>
				{refreshing && (
					<Text style={{ textAlign: 'center', padding: 20 }}>
						Fetching addresses...
					</Text>
				)}
				{!refreshing &&
					address.length > 0 &&
					address.map((item, index) => {
						//console.log(item, index);
						return (
							<Pressable
								key={index}
								onPress={() => {
									setCurrentSelectedAddress(item);
									dispatch({
										type: 'ADD_ADDRESS',
										payload: item,
									});
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
									borderWidth: 1.5,
									width: '100%',
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
