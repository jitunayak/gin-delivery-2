import { Button, Layout, Text } from '@ui-kitten/components';
import React, { useState } from 'react';
import { Alert, Dimensions, StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import CartItems from '../components/CartItems';
import PhonePeModal from '../components/PhonePeModal';
import TimSchedule from '../components/TimSchedule';

export default function CartScreen({ navigation }) {
	const [modalVisible, setModalVisible] = useState(false);
	const [totalPrice, setTotalPrice] = useState(0);

	const dispatch = useDispatch();

	const { address } = useSelector(
		(state) => state.addressReducer.selectedAddress
	);

	const { items, isCartEmpty } = useSelector(
		(state) => state.cartReducer.selectedItems
	);

	/**
	 * TODO Yet to be implemented
	 */
	const makeTheCartEmpty = () =>
		dispatch({
			type: 'EMPTY_CART',
			payload: null,
		});
	//Alert.alert('Not implemented yet');

	/**
	 * TODO put it in separate component
	 */
	const PaymentContainer = () => {
		return (
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
						onPress={() => makeTheCartEmpty()}
					>
						Clear cart
					</Button>
					<PhonePeModal amount={totalPrice} navigation={navigation} />
				</Layout>
			</Layout>
		);
	};

	/* Main Screen view for Cart Screen */
	return (
		<>
			{!isCartEmpty ? (
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
					<PaymentContainer />
				</Layout>
			) : (
				<Layout
					style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
				>
					<Text category={'h3'} style={{ textAlign: 'center' }}>
						Empty Cart
					</Text>
					<Text category={'c2'} style={{ textAlign: 'center' }}>
						Go back and add some items
					</Text>
					<Image
						source={{
							uri: 'https://image.freepik.com/free-vector/empty-concept-illustration_114360-1253.jpg',
						}}
						style={{
							width: 300,
							height: 400,
						}}
					/>
				</Layout>
			)}
		</>
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
