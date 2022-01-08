import { Button, Layout, Spinner, Text } from '@ui-kitten/components';
import Constants from 'expo-constants';
import React, { useEffect, useState } from 'react';
import { Dimensions, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

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
		<Layout
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: COLORS.LIGHT_GREY,
			}}
		>
			{orders.length === 0 ? <Text>No Orders </Text> : null}
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
					marginTop: Constants.statusBarHeight,
					marginRight: 10,
				}}
			>
				<Text category={'h3'} style={{ paddingHorizontal: 20 }}>
					Orders
				</Text>
				{refreshing ? (
					<Text category={'h6'} style={{ paddingHorizontal: 20 }}>
						fetching...
					</Text>
				) : null}

				{orders.map((order, index) => {
					const OrderStatus = (
						<>
							<Text
								category={'c2'}
								style={{
									paddingVertical: 10,
									color: order.Delivered ? COLORS.BLACK : COLORS.ACCENT,
								}}
							>
								{order.Delivered
									? `Delivered on ${new Date(
											order.updatedAt
									  ).toLocaleDateString()} , ${new Date(
											order.updatedAt
									  ).toLocaleTimeString()}`
									: `Order: ${new Date(
											order.createdAt
									  ).toDateString()}  ${new Date(
											order.createdAt
									  ).toLocaleTimeString()}`}
							</Text>
						</>
					);
					return (
						<Layout
							key={order._id}
							style={{
								width: Dimensions.get('screen').width,
								padding: 20,
								margin: 6,
							}}
						>
							{OrderStatus}

							<Text category={'c2'} style={{ paddingVertical: 10 }}>
								Total Bill : {SYMBOLS.INR} {order.cart.totalCost}
							</Text>
							<Text category={'c2'}>
								Total No of Items :{order.cart.totalQty}
							</Text>
							<Layout
								style={{
									flexDirection: 'row',
									justifyContent: 'flex-start',
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
				})}
			</ScrollView>
		</Layout>
	);

	function RatingAndReview(delivered) {
		return (
			<Layout style={{ flexDirection: 'row' }}>
				<Button
					appearance={delivered ? 'outline' : 'filled'}
					status={delivered ? 'basic' : 'danger'}
					style={{ flex: 1, margin: 10 }}
				>
					{delivered ? 'Rate Delivery' : 'Sheduled'}
				</Button>
				<Button
					appearance={'outline'}
					status={'info'}
					style={{ flex: 1, margin: 10 }}
				>
					Review
				</Button>
			</Layout>
		);
	}
}
