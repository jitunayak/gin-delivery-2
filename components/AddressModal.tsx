import {
	Input,
	Layout,
	Icon,
	Button,
	Text,
	CheckBox,
	Spinner,
} from '@ui-kitten/components';
import React, { useState, useEffect } from 'react';
import {
	View,
	Alert,
	StyleSheet,
	Pressable,
	Modal,
	KeyboardAvoidingView,
	Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../utilities/Constants';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

export default function AddressModal({ navigation }) {
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
	});
	const AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;

	function updatenewAddress() {
		//console.log({ "New Address": newAddress });
		dispatch({ type: 'ADD_ADDRESS', payload: newAddress });
	}

	const renderCaption = () => {
		return <Text status={'danger'}>Should contain at least 8 symbols</Text>;
	};
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied');
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);
		})();
	}, []);

	let text = 'Waiting..';
	if (errorMsg) {
		text = errorMsg;
	} else if (location) {
		text = JSON.stringify(location);
	}

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
			<Input
				value={newAddress.name}
				label="Name"
				placeholder="Jitu Nayak"
				textContentType="name"
				//   caption={renderCaption}
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
				//   caption={renderCaption}
				onChangeText={(nextValue) =>
					setnewAddress({ ...newAddress, phone: nextValue })
				}
				style={{ marginVertical: 2 }}
			/>
			<Input
				value={newAddress.address1}
				label="House No, Street, Locality"
				placeholder="1/2, Times Square, Locality"
				//   caption={renderCaption}
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
				onPress={() => {
					updatenewAddress();
					navigation.navigate('Order');
				}}
				status={'primary'}
				appearance={'filled'}
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
