import { MaterialIcons } from '@expo/vector-icons';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import { Button, Spinner } from '@ui-kitten/components';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';

import { API, COLORS } from '../utilities/Constants';

export default function PhonePeModal({ amount, navigation }) {
	const stripe = useStripe();
	const { items } = useSelector((state) => state.cartReducer.selectedItems);
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState('jitunayak715@gmail.com');
	const {
		selectedAddress: { address },
		sheduledDeliveryTime,
	} = useSelector((state) => state.addressReducer);

	//console.log({ address }, { sheduledDeliveryTime });

	const placeOrder: any = async () => {
		const mappedCartItems = [];
		items.forEach((item) => {
			const { id, ...others } = item;
			mappedCartItems.push({ _id: item.id, ...others });
		});

		try {
			const response = await fetch(`${API.BASE_URL}/order`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					authorization: API.JWT_TOKEN,
				},
				body: JSON.stringify({
					user: '61ccb12a2c4515c1b403363c',
					cart: {
						totalQty: mappedCartItems.length,
						totalCost: amount,
						items: mappedCartItems,
					},
					address: {
						name: address.name,
						phoneNumber: address.phoneNumber,
						address1: address.address1,
						address2: address.address2,
						pin: address.pincode,
						geoLocation: address.geoLocation,
					},
					sheduledDeliveryTime: sheduledDeliveryTime,
					paymentId:
						'pi_3KD1QbSBhy92HuL30K0qHfAA_secret_D58Vl2cGdokESHcLbv2GMv9sO',
					Delivered: false,
				}),
			});
			console.log('response ', { response });
		} catch (er) {
			console.log(er);
			Alert.alert(er);
		}
		//return response;
	};

	const fetchPaymentIntentClientSecret: any = async () => {
		const response = await fetch(
			`${API.BASE_URL}/stripe/create-payment-intent`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					authorization: API.JWT_TOKEN,
				},
				body: JSON.stringify({
					amount: amount,
				}),
			}
		);
		const { clientSecret, error } = await response.json();
		return { clientSecret, error };
	};

	const makeAPayment = async () => {
		setLoading(true);
		try {
			const { clientSecret, error } = await fetchPaymentIntentClientSecret();
			//console.log("ephmeralKey", ephemeralKey);
			if (error) {
				Alert.alert('Unable to process payment');
				setLoading(false);
			}
			const initSheet = await stripe.initPaymentSheet({
				paymentIntentClientSecret: clientSecret,
				primaryButtonColor: COLORS.ACCENT,
				merchantDisplayName: 'Gin Delivery',
				customerId: 'cus_Krr9yHcBfGrVwG',
				style: 'automatic',
				// customerEphemeralKeySecret: ephemeralKey,
			});
			if (initSheet.error) {
				//console.error(initSheet.error);
				setLoading(false);
				return Alert.alert(initSheet.error.message);
			}
			const presentSheet = await stripe.presentPaymentSheet({
				clientSecret: clientSecret,
			});
			if (presentSheet.error) {
				//console.error(presentSheet.error);
				setLoading(false);
				return Alert.alert(presentSheet.error.message);
			}
			const res = await placeOrder();
			console.log(res);
			navigation.navigate('Success');
		} catch (err) {
			console.error(err);
			setLoading(false);
			Alert.alert('Payment failed!');
		}
	};
	return (
		<StripeProvider publishableKey="pk_test_51J5aVYSBhy92HuL3Qwn9pVoRyOuWzayePWJAPBT5Rs00wYdy1c6Z5N1nEFqAK36zMm40U9TA7pb4DxU0dHM9uOcn00UmL2PnhB">
			<Button
				accessoryRight={() => (
					<MaterialIcons name="payment" size={20} color="white" />
				)}
				accessoryLeft={() => {
					return loading ? <Spinner size="small" status={'success'} /> : null;
				}}
				style={{ backgroundColor: 'black', borderColor: 'black', flex: 1 }}
				size={'medium'}
				onPress={makeAPayment}
				disabled={loading}
			>
				MAKE PAYMENT
			</Button>
		</StripeProvider>
	);
}
