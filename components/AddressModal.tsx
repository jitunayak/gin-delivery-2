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

export default function AddressModal({ navigation }) {
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const [checked, setChecked] = React.useState(true);
	const dispatch = useDispatch();
	const { address } = useSelector(
		(state) => state.addressReducer.selectedAddress
	);
	//console.log({ store: address });

	const [newAddress, setnewAddress] = useState({
		name: address.name || '',
		phone: address.phone || '',
		address1: address.address1 || '',
		address2: address.address2 || '',
		pincode: address.pincode || '',
		geoLocation: null,
	});
	const AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;

	async function updatenewAddress() {
		dispatch({ type: 'ADD_ADDRESS', payload: newAddress });

		const finalAddress = { address: newAddress };

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
			console.log({ result });
			alert('Saved');
			return result;
			//const data = await response.json();
			// console.log({ 'server response': response });
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
			/>
			<Input
				value={newAddress.phone}
				label="Phone Number"
				placeholder="000-000-0000"
				textContentType="telephoneNumber"
				onChangeText={(nextValue) =>
					setnewAddress({ ...newAddress, phone: nextValue })
				}
				style={{ marginVertical: 2 }}
			/>
			<Input
				value={newAddress.address1}
				label="House No, Street, Locality"
				placeholder="1/2, Times Square, Locality"
				onChangeText={(nextValue) =>
					setnewAddress({ ...newAddress, address1: nextValue })
				}
				style={{ marginVertical: 2 }}
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
							//navigation.navigate('Order');
							console.log({ data });
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
