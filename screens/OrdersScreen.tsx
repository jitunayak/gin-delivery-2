import { Button, Layout, Spinner, Text } from '@ui-kitten/components';
import Constants from 'expo-constants';
import React, { useEffect, useState } from 'react';
import { Dimensions, RefreshControl, StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MultiSelectTab from '../components/MultiSelectTab';

import { API, COLORS, SYMBOLS } from '../utilities/Constants';

export default function OrdersScreen() {
	const [refreshing, setRefreshing] = React.useState(true);

	const fetchRecentOrders = async () => {
		try {
			const orders = await fetch(
				`${API.BASE_URL}/order/customer/61ccb12a2c4515c1b403363c`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						authorization: API.JWT_TOKEN,
					},
				}
			);
			const jsonOrders = await orders.json();
			setOrders(jsonOrders.reverse());
			setRefreshing(false);
		} catch (err) {
			setRefreshing(false);
		}
	};
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		fetchRecentOrders();
		return () => {};
	}, [refreshing]);

	return (
		<Layout style={styles.primaryContainer}>
			{/* <Text
				category={'h6'}
				style={{ paddingHorizontal: 20, textAlign: 'center' }}
				>
				ORDERS
			</Text> */}
			<MultiSelectTab />
			{orders.length === 0 ? (
				<Layout style={{ justifyContent: 'center', alignItems: 'center' }}>
					<Image
						source={require('../assets/pngs/no_data.png')}
						style={{ width: 200, height: 200 }}
					/>
					<Text category={'s1'} style={{ margin: 30 }}>
						NO ORDERS{' '}
					</Text>
				</Layout>
			) : null}
			<ScrollView
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={() => setRefreshing(true)}
					/>
				}
				style={{
					flex: 1,
					width: Dimensions.get('window').width,
					marginRight: 10,
				}}
			>
				{refreshing ? (
					<Text category={'h6'} style={{ paddingHorizontal: 20 }}>
						fetching...
					</Text>
				) : null}

				{orders.map((order, index) => {
					return OrderItem(order);
				})}
			</ScrollView>
		</Layout>
	);

	function OrderItem(order: any): JSX.Element {
		return (
			<Layout key={order._id} style={styles.container}>
				<Text
					category={'p2'}
					style={{
						paddingVertical: 6,
						color: order.Delivered ? COLORS.GREY : COLORS.DARK_GREY,
					}}
				>
					{order.Delivered
						? `Delivered on ${new Date(
								order.updatedAt
						  ).toLocaleDateString()} , ${new Date(
								order.updatedAt
						  ).toLocaleTimeString()}`
						: `Order: ${new Date(order.createdAt).toDateString()}  ${new Date(
								order.createdAt
						  ).toLocaleTimeString()}`}
				</Text>

				<Text category={'c2'} style={{ paddingVertical: 10 }}>
					Total Bill: {SYMBOLS.INR} {order.cart.totalCost}
				</Text>
				<Text category={'c2'}>Total No of Items :{order.cart.totalQty}</Text>
				<Layout
					style={{
						flexDirection: 'row',
						justifyContent: 'flex-start',
						flexWrap: 'wrap',
						paddingVertical: 6,
					}}
				>
					{order.cart.items.map((item, index) => {
						return (
							<Text category={'c1'} key={index}>
								{item.name} x {item.quantity}
							</Text>
						);
					})}
				</Layout>
				{RatingAndReview(order.Delivered)}
			</Layout>
		);
	}

	function RatingAndReview(delivered) {
		return (
			<Layout style={{ flexDirection: 'row' }}>
				<Button
					appearance={delivered ? 'outline' : 'filled'}
					status={delivered ? 'success' : 'success'}
					style={{ flex: 2, marginTop: 10, marginBottom: 10 }}
				>
					{delivered ? 'Rate Delivery' : 'Sheduled'}
				</Button>
				<Button
					appearance={'outline'}
					status={'basic'}
					style={{
						flex: 2,
						marginTop: 10,
						marginBottom: 10,
						marginLeft: 10,
						borderColor: COLORS.GREY,
						backgroundColor: COLORS.WHITE,
					}}
				>
					{delivered ? 'Review' : 'Help'}
				</Button>
			</Layout>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: Dimensions.get('screen').width,
		paddingHorizontal: 40,
		margin: 6,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.ACCENT_LIGHT,
	},
	primaryContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: Constants.statusBarHeight,
	},
});
