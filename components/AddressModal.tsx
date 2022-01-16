import {
	Button,
	CheckBox,
	Icon,
	Input,
	Layout,
	Spinner,
	Text,
} from '@ui-kitten/components';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { API } from '../utilities/Constants';

export default function AddressModal({ route, navigation }) {
	const { allAddresses, currentSelectedAddress } = route.params;

	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const [checked, setChecked] = React.useState(true);
	const dispatch = useDispatch();
	// const { address } = useSelector(
	// 	(state) => state.addressReducer.selectedAddress
	// );
	//console.log({ store: address });
	//console.log({ currentSelectedAddress });

	const [newAddress, setnewAddress] = useState({
		name: currentSelectedAddress !== null ? currentSelectedAddress.name : '',
		phone: currentSelectedAddress !== null ? currentSelectedAddress.phone : '',
		address1:
			currentSelectedAddress !== null ? currentSelectedAddress.address1 : '',
		address2:
			currentSelectedAddress !== null ? currentSelectedAddress.address2 : '',
		pincode:
			currentSelectedAddress !== null ? currentSelectedAddress.pincode : '',
		geoLocation: null,
	});

	// currentSelectedAddress !== null && setnewAddress(currentSelectedAddress);

	// console.log({ newAddress });

	const AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;

	async function updatenewAddress() {
		dispatch({ type: 'ADD_ADDRESS', payload: newAddress });

		let finalAddress;

		if (currentSelectedAddress === null) {
			finalAddress = { address: [...allAddresses, newAddress] };
		} else {
			let allAddressesCopy = [...allAddresses];
			const updatedAddress = allAddressesCopy.filter(
				(address) => address._id !== currentSelectedAddress._id
			);
			//console.log({ updatedAddress });
			finalAddress = { address: [newAddress, ...updatedAddress] };
		}
		// console.log({ finalAddress });

		// console.log(JSON.stringify(finalAddress));
		try {
			const result = await fetch(
				`${API.BASE_URL}/users/61d35108715a7baea58859ca`,
				{
					method: 'PUT',
					body: JSON.stringify(finalAddress),
					headers: {
						'Content-Type': 'application/json',
						Authorization: API.JWT_TOKEN,
						'api-key': API.API_KEY,
					},
				}
			);
			// console.log({ result });
			alert('Address updated successfully');
			return result;
		} catch (er) {
			// alert(er);
			console.log(er);
			return er;
		}
	}

	const renderCaption = () => {
		return <Text status={'danger'}>Should contain at least 8 symbols</Text>;
	};

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied');
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);
			setnewAddress({ ...newAddress, geoLocation: JSON.stringify(location) });
			// console.log({ 'useEffect: ': newAddress });
		})();
	}, []);

	const AddressForm = (
		<Layout>
			<Input
				value={newAddress.name}
				label="Name"
				placeholder="Jitu Nayak"
				textContentType="name"
				onChangeText={(nextValue) =>
					setnewAddress({ ...newAddress, name: nextValue })
				}
				style={{ marginVertical: 2 }}
				status={!newAddress.name ? 'danger' : null}
				caption={!newAddress.name ? 'Name is required' : null}
				autoFocus={false}
			/>
			<Input
				value={newAddress.phone}
				label="Phone Number"
				placeholder="000-000-0000"
				textContentType="telephoneNumber"
				onChangeText={(nextValue) =>
					setnewAddress({ ...newAddress, phone: nextValue })
				}
				style={{ marginVertical: 10 }}
				status={newAddress.phone.length !== 10 ? 'danger' : 'basic'}
				caption={
					newAddress.phone.length !== 10
						? 'Phone Number must be 10 digits'
						: null
				}
				maxLength={10}
				autoFocus={false}
			/>
			<Input
				value={newAddress.address1}
				label="House No, Street, Locality"
				placeholder="1/2, Times Square, Locality"
				onChangeText={(nextValue) =>
					setnewAddress({ ...newAddress, address1: nextValue })
				}
				style={{ marginVertical: 2 }}
				status={!newAddress.address1 ? 'danger' : 'basic'}
				caption={!newAddress.address1 ? 'House No is required' : null}
				autoFocus={false}
			/>
			<Input
				value={newAddress.address2}
				label="Area / City"
				placeholder="Bapuji Nagar"
				textContentType="addressCityAndState"
				//   caption={renderCaption}
				onChangeText={(nextValue) =>
					setnewAddress({ ...newAddress, address2: nextValue })
				}
				style={{ marginVertical: 2 }}
				status={!newAddress.address2 ? 'danger' : 'basic'}
				caption={!newAddress.address2 ? 'Area is required' : null}
				autoFocus={false}
			/>
			<Input
				value={newAddress.pincode}
				label="PINCODE"
				placeholder="750021"
				textContentType="postalCode"
				//   caption={renderCaption}
				onChangeText={(nextValue) =>
					setnewAddress({ ...newAddress, pincode: nextValue })
				}
				style={{ marginVertical: 2 }}
				status={!newAddress.pincode ? 'danger' : 'basic'}
				caption={!newAddress.pincode ? 'Pincode is required' : null}
				autoFocus={false}
			/>
		</Layout>
	);
	return (
		// <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
		<Layout
			style={{
				flex: 1,
				padding: 20,
				flexDirection: 'column',
			}}
		>
			{/* <Text category={"h4"}>Add Address</Text> */}

			{/* <Text>{text}</Text> */}
			{location !== null ? (
				<MapView
					region={{
						latitude: location.coords.latitude,
						longitude: location.coords.longitude,
						latitudeDelta: 0.0000922,
						longitudeDelta: 0.00221,
					}}
					style={{
						width: Dimensions.get('screen').width - 40,
						height: 200,
						right: 10,
						margin: 10,
					}}
				>
					<Marker
						key={1}
						coordinate={location.coords}
						title={'Your Location'}
						description={'Confirm your location'}
					/>
				</MapView>
			) : (
				<Layout style={{ alignItems: 'center' }}>
					<Spinner />
					<Text>Loading Your Map Data</Text>
				</Layout>
			)}
			{location !== null ? AddressForm : null}

			<Layout style={{ flexDirection: 'row' }}>
				<CheckBox
					status={'primary'}
					checked={checked}
					onChange={(nextChecked) => setChecked(nextChecked)}
				/>
				<Text category={'c1'} style={{ padding: 10 }}>
					Above information would be stored and processed for providing better
					user experience
				</Text>
			</Layout>
			<Button
				onPress={async () => {
					updatenewAddress()
						.then((data) => {
							navigation.navigate('Order');
							//console.log({ data });
						})
						.catch((err) => {
							console.log({ err });
						});
				}}
				status={'primary'}
				appearance={'filled'}
				disabled={!location}
			>
				Deliver here
			</Button>
		</Layout>
		// </SafeAreaView>
	);
}

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 20,
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: '#F194FF',
	},
	buttonClose: {
		backgroundColor: '#2196F3',
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
});
