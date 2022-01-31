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
import {
	Dimensions,
	KeyboardAvoidingView,
	StyleSheet,
	ScrollView,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { API, COLORS } from '../utilities/Constants';

export default function AddressModal({ route, navigation }) {
	const { allAddresses, currentSelectedAddress } = route.params;
	const [loading, setLoading] = useState(false);
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

	const AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;

	async function addNewAddress() {
		setLoading(true);
		dispatch({ type: 'ADD_ADDRESS', payload: newAddress });

		let finalAddress;

		if (currentSelectedAddress === null) {
			finalAddress = { address: [...allAddresses, newAddress] };
		} else {
			let allAddressesCopy = [...allAddresses];
			const updatedAddress = allAddressesCopy.filter(
				(address) => address._id !== currentSelectedAddress._id
			);
			finalAddress = { address: [newAddress, ...updatedAddress] };
		}
		await updateUserAddressesOnServer(finalAddress);
	}

	async function deleteAddress() {
		setLoading(true);
		let allAddressesCopy = [...allAddresses];
		const addressesWithOutCurrentOne = allAddressesCopy.filter(
			(address) => address._id !== currentSelectedAddress._id
		);
		const finalAddress = { address: [...addressesWithOutCurrentOne] };
		await updateUserAddressesOnServer(finalAddress);
	}

	async function updateUserAddressesOnServer(finalAddress) {
		try {
			const result = await fetch(`${API.BASE_URL}/users/${API.USER_ID}`, {
				method: 'PUT',
				body: JSON.stringify(finalAddress),
				headers: {
					'Content-Type': 'application/json',
					Authorization: API.JWT_TOKEN,
					'api-key': API.API_KEY,
				},
			});
			return result;
		} catch (er) {
			alert("Can't update, temporary Issue with Server");
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
				console.log('Permission not granted');
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);
			setnewAddress({ ...newAddress, geoLocation: JSON.stringify(location) });
			// console.log({ 'useEffect: ': newAddress });
		})();
	}, []);

	const AddressForm = (
		<>
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
				keyboardType="phone-pad"
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
				keyboardType="number-pad"
				maxLength={6}
			/>
		</>
	);
	const AddressActionButtons = (
		<Layout style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
			<Button
				appearance={'outline'}
				status={'danger'}
				style={{ flex: 1 }}
				disabled={!location || loading}
				onPress={async () => {
					deleteAddress()
						.then((data) => {
							navigation.goBack();
						})
						.catch((err) => alert('Unable to delete'));
				}}
			>
				Delete
			</Button>
			<Button
				style={{ flex: 2, marginLeft: 10 }}
				status={'primary'}
				appearance={'filled'}
				disabled={!location || loading}
				onPress={async () => {
					addNewAddress()
						.then((data) => {
							setLoading(false);
							navigation.goBack();
						})
						.catch((err) => {
							console.log({ err });
							alert('Server error response');
						});
				}}
			>
				Deliver here
			</Button>
		</Layout>
	);
	return (
		<ScrollView style={{ flex: 1 }}>
			<KeyboardAvoidingView
				style={{
					flex: 1,
					padding: 20,
					flexDirection: 'column',
					backgroundColor: COLORS.WHITE,
				}}
			>
				{location !== null ? null : ( // </MapView> // 	/> // 		description={'Confirm your location'} // 		title={'Your Location'} // 		coordinate={location.coords} // 		key={1} // 	<Marker // > // 	}} // 		margin: 10, // 		right: 10, // 		height: 200, // 		width: Dimensions.get('screen').width - 40, // 	style={{ // 	}} // 		longitudeDelta: 0.00221, // 		latitudeDelta: 0.0000922, // 		longitude: location.coords.longitude, // 		latitude: location.coords.latitude, // 	region={{ // <MapView
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
				{AddressActionButtons}
				{loading ? (
					<>
						<Text style={{ textAlign: 'center' }}>updating...</Text>
					</>
				) : null}
			</KeyboardAvoidingView>
		</ScrollView>
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
