import { Button, Layout, Text } from '@ui-kitten/components';
import React, { useState } from 'react';
import { Alert, Dimensions, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import CartItems from '../components/CartItems';
import PhonePeModal from '../components/PhonePeModal';
import TimSchedule from '../components/TimSchedule';

export default function CartScreen({ navigation }) {
	const [modalVisible, setModalVisible] = useState(false);
	const [totalPrice, setTotalPrice] = useState(0);

	const { address } = useSelector(
		(state) => state.addressReducer.selectedAddress
	);

	/**
	 * TODO Yet to be implemented
	 */
	function makeTheCartEmpty() {
		Alert.alert('Not implemented yet');
	}

	/**
	 * TODO put it in separate component
	 */
	const PaymentContainer = (
		<Layout
			style={{
				padding: 10,
				position: 'absolute',
				bottom: 5,
				width: Dimensions.get('window').width,
				shadowRadius: 10,
				shadowColor: '#000',
				shadowOffset: { width: 0, height: -10 },
				shadowOpacity: 0.1,
			}}
		>
			<Layout
				style={{
					flexDirection: 'row',
					justifyContent: 'space-evenly',
					marginBottom: 20,
					marginHorizontal: 10,
					marginTop: 10,
				}}
			>
				<Button
					appearance={'outline'}
					status={'basic'}
					style={{ marginRight: 10 }}
				>
					Clear cart
				</Button>
				<PhonePeModal amount={totalPrice} navigation={navigation} />
			</Layout>
		</Layout>
	);

	/* Main Screen view for Cart Screen */
	return (
		<Layout style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={true}>
				<CartItems
					navigation={navigation}
					totalPrice={totalPrice}
					setTotalPrice={setTotalPrice}
				/>
				<TimSchedule />
				<Button
					style={{ marginHorizontal: 10 }}
					appearance={'ghost'}
					onPress={() => navigation.navigate('Address')}
				>
					{address.address1 === '' ? 'Add Address' : 'Change Address'}
				</Button>
				{address.address1 !== '' ? (
					<Text style={{ textAlign: 'center', paddingVertical: 10 }}>
						Choosen address is for {address.name} {`,${address.address1}`}
					</Text>
				) : null}
			</ScrollView>
			{PaymentContainer}
		</Layout>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	button: {
		backgroundColor: 'black',
		borderColor: 'black',
		margin: 10,
		flex: 1,
	},
});
