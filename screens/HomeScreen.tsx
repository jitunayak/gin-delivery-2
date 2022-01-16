import { SimpleLineIcons } from '@expo/vector-icons';
import { Layout, Text } from '@ui-kitten/components';
import Constants from 'expo-constants';
import React, { useEffect, useState, createRef } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import Categories from '../components/Categories';
import Item from '../components/Item';
import { Product } from '../models/Product';
import { COLORS, SYMBOLS } from '../utilities/Constants';
import ActionSheet from 'react-native-actions-sheet';
import SelectAddress from '../components/SelectAddress';
import { AntDesign } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
	const actionSheetRef = createRef();
	const fetchedProducts = [
		{
			id: '1we23klpd',
			name: 'Panner',
			price: 30,
			isAvailable: true,
			weight: '1ltr',
			quantity: 0,
			image:
				'https://previews.123rf.com/images/bigacis/bigacis1610/bigacis161000162/65500420-bowl-of-diced-soft-cheese-isolated-on-white-background-top-view.jpg',
			category: 'Milk',
		},
		{
			id: '12asbhej',
			name: 'Nandini Milk',
			price: 22,
			weight: '500ml',
			quantity: 0,
			image:
				'https://www.kmfnandini.coop/sites/default/files/styles/product_popup_600x500/public/products/Pasteurised-Toned-Milk-b.png?itok=x64Sfsmk',
			category: 'Milk',
			isAvailable: true,
		},
		{
			id: '1we23kl',
			name: 'Toned milk',
			price: 34,
			isAvailable: true,
			weight: '500ml',
			quantity: 0,
			image:
				'https://www.kmfnandini.coop/sites/default/files/styles/product_popup_600x500/public/products/Nandini-Double-Toned-Milk-b.png?itok=vdjKgE_l',
			category: 'Milk',
		},
		{
			id: '12asbhejp',
			name: 'Onions',
			price: 65,
			isAvailable: true,
			weight: '1kg',
			quantity: 0,
			image:
				'https://media.istockphoto.com/photos/red-onions-picture-id499146498?k=20&m=499146498&s=612x612&w=0&h=fe8fftS2SpmSlx_KAT_wOPIhlwO9SFelIwq0nmG8NmA=',
			category: 'Vegetables',
		},
		{
			id: '1we23klp',
			name: 'Potatoes',
			price: 20,
			isAvailable: true,
			weight: '1kg',
			quantity: 0,
			image:
				'https://media.istockphoto.com/photos/three-potatoes-picture-id157430678?k=20&m=157430678&s=612x612&w=0&h=dfYLuPYwA50ojI90hZ4jCgKZd5TGnqf24UCVBszoZIA=',
			category: 'Vegetables',
		},
		{
			id: '12asbhevjpk',
			name: 'Dosa with Chutney',
			price: 55,
			isAvailable: true,
			weight: '1 Dosa',
			quantity: 0,
			image:
				'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUSEhIWFRUXFRcWFxgWFxoYGBIXFRUWFxUWFRcZHSggGBolHhUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGy8mICUtMC0rLS0tLS0tKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vLi0tNS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAwUCBAYHAf/EAD4QAAIBAgMFBAcFBwQDAAAAAAABAgMRBCExBRJBUWEGcYGREyIyobHR8BRCUsHhBxUjM2KC8UNTorIkY3L/xAAZAQEAAwEBAAAAAAAAAAAAAAAAAQIDBAX/xAAqEQEAAgIBBAECBQUAAAAAAAAAAQIDERIEITFBEzJRImGBkfAUQqGx0f/aAAwDAQACEQMRAD8A9xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADYAGvUxXLPrwIHi5dDK2asLxSZb4NGOMlxSfcTQxceN13kxlpPtE0mGwDGNRPRpmRpvaoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGjjqzUrcLX7/rI3ijx8/wCJLw+Bhntxq0xxuUyqLuDZXzn1MXXscM5G/FZ3PjkV6xIWJHywnjLf3jKNafCXnn8TRWJ5BV+bJi/2RxWlPGvRq/dkTQxsHxt3lPTxCufKtVPxNY6i0R5VnFDoIVE9Gn3MyOdVRd3Lr3Mm+21I6O/f8zSOqj3Ck4Z9LwFVS2v+KNu79Tdp42D4278v0Nq5qW8SpOO0emwD4nfQ+mqgAAAAAAAAAAAAAAAAAABTbYg1JPg1719IuSLEUFNWfh0ZnlpzrpaluM7cxUvc153LargJ5+rpy+KRV16TTzv3M8nJS1fMOysxKGU+JDKpf6+upnNEU4ric0toTUsRoj79ozz1K+onwI6kne/562Ii8p4LV11rcnjWvG6ff3lFGurZszpYm2v14fWheMiJotftLX6kkcRvLJ5/M0JYjeXO1l0y4mMa/C1uT5l+eleK2jUfG/zJYVLLXxZUrF5pPUlhiL8l7y8XhWayuqFTd4tPoSQ2lUTta66/oVdKWT1JnW00+uBrGSY8TpSax7XtHHX1Vu79SaGJg9JI591r6vyJadXlY6K9TaPLKcUOhBR08VbRtvpp4mUNqTWqTNf6qntT4bel0DQp7UjxTXvNqliYy0kvh8TWuWlvEqTS0eYSgA0VAAAAAAAAAAANTH1IKPrpPvVzYqysjiu021rNwhnK9ul+RnlyVpH4l6Vm09mGJxdOMnuQvnxbsu5J/Fs1J7WS19GvCP5nOehq1buVRKOeV9XwT4K/cVssLa6lL7zSellFN3tm28nl0fI82M0T9FYd1cE282dvDasX96m/CHyNiM6ctacP7br4OxxFDAxcU95ty5PJLLVt2tmySFCpB2U7Z88snqm38CZyzr8VIllSK2nUWmHXz2PGX8ubi+U80/7krryK3FU50nuzjuPhyfVPj4EOB2jWpxjKfrRekrppp6O6zV/E6/Dxp4yi4S8HxpyaykvrMzimHN2x9rfb1/P5ppNsmP6u8fdy1LEWvbR5+P0jYVRcv8tHNS2gqc505P1oTlB24OEnF+9G5hsdCWj9+Zy947S6Jr7XsJxSv8GTwxMUub6fAo/S5cfA+wrfX1xJi2lZptefam9D59p4XV+pTyxGiX+DOnSk82/pE8kcFt9st153M6GJm1vNWXLjY06CS695OquehblKsxCwp17L3mbxkb9eRVOrpxPm84u7I+U4LunUXFkrr3006PUqozvqSxnyNIv2UmFpSryWkmvh5G5T2g+OZS0qrXH9DJYnPma1y2r4lSaRLoaWOi9U0bEZp6M5pYnwRL9pvY6K9XPtnOGPTogU9DFNfe838zdw2Jcnay+R00z1sytjmG2ADZmHxs+mMgI6iyZxOMwiou843fCWqlzauzt5FXjKad4tJp6pq6femZZMUX7+163mrzipjY0a0t9erKzheySaSXB6/EpcLjtytOolbOTve69Zt5JLL8vE7fbfY+hiLu86btb1XvJdd2XzOef7PqkbOGJg2uMoOL1TXstnBHS5I3v29Dpeox1ma27RKnwsaFSbqtptO1llFuzvJxXhcjeJjTnvxurSyUpOScb5K0s4vV5P5HTPsY2s504ySSvBStbjdbvVkdPsdGMk6lfeSd3FQedtFm10+Rn/AE+TetdmVr0if+InUckkk2na2mXHJFzsXEvB06teo2qMIttt335JNqEL6u9u7Mzj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',
			category: 'Breakfast',
		},
	];
	const [selectedCategory, setSelectedCategory] = useState('Vegetables');
	const [totalCost, setTotalCost] = useState(0);
	const [totalItemsInCart, setTotalItemsInCart] = useState(0);

	//const { items } = useSelector((state) => state.cartReducer.selectedItems);
	const [products, setProducts] = useState<Product[]>(fetchedProducts);

	const dispatch = useDispatch();
	const isCartEmpty = useSelector(
		(state) => state.cartReducer.selectedItems.isCartEmpty
	);
	useEffect(() => {
		actionSheetRef.current?.setModalVisible();
		return () => {};
	}, []);

	useEffect(() => {
		isCartEmpty ? setProducts(fetchedProducts) : null;

		return () => {};
	}, [isCartEmpty]);

	useEffect(() => {
		const copyOfProducts = [...products];
		const totalInCart = copyOfProducts.reduce((sum, curr) => {
			sum += curr.quantity;
			return sum;
		}, 0);

		const totalCost = copyOfProducts.reduce((totalCost, item) => {
			totalCost += item.price * item.quantity;
			return totalCost;
		}, 0);
		setTotalCost(totalCost);
		setTotalItemsInCart(totalInCart);
		return () => {};
	}, [products]);

	const CartButton = () => {
		return (
			<TouchableOpacity
				style={styles.cartButtonContainer}
				onPress={() => navigation.navigate('Order')}
			>
				<Layout
					style={{ flexDirection: 'column', backgroundColor: COLORS.ACCENT }}
				>
					<Layout
						style={{
							backgroundColor: COLORS.ACCENT,
							flexDirection: 'row',
							alignItems: 'center',
						}}
					>
						<Text
							category={'s2'}
							style={{
								color: COLORS.WHITE,
							}}
						>
							{totalItemsInCart}
							{totalItemsInCart === 1 ? ' item' : ' items'} |
						</Text>
						<Text
							category={'s1'}
							style={{
								color: COLORS.WHITE,
								paddingHorizontal: 10,
							}}
						>
							{SYMBOLS.INR} {totalCost}
						</Text>
					</Layout>
					{/* <Text category={'c1'} style={{ color: COLORS.ACCENT_LIGHT }}>
						Extra charges may apply
					</Text> */}
				</Layout>
				<Layout
					style={{
						flexDirection: 'row',
						backgroundColor: COLORS.ACCENT,
						alignItems: 'center',
					}}
				>
					<Text
						category={'s1'}
						style={{
							color: COLORS.WHITE,
							paddingHorizontal: 6,
						}}
					>
						VIEW CART
					</Text>
					<SimpleLineIcons name="handbag" size={20} color="white" />
				</Layout>
			</TouchableOpacity>
		);
	};

	const HomeHeader = (
		<Layout style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
			<Layout style={{ flexDirection: 'column' }}>
				<Text category={'h2'} style={{ color: COLORS.ACCENT, marginLeft: 10 }}>
					{SYMBOLS.APP_NAME}
				</Text>
				<Text category={'p2'} style={{ color: COLORS.ACCENT, marginLeft: 10 }}>
					{SYMBOLS.POWERED_BY_GIN}
				</Text>
			</Layout>
			<TouchableOpacity
				onPress={() => {
					actionSheetRef.current?.setModalVisible();
				}}
			>
				<Layout
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						padding: 10,
						marginHorizontal: 10,
					}}
				>
					<Text category={'c2'}>Change Location</Text>
					<AntDesign name="down" size={20} color={COLORS.GREY} />
				</Layout>
			</TouchableOpacity>
		</Layout>
	);

	return (
		<>
			<Layout style={styles.container}>
				{HomeHeader}
				<Layout style={styles.subcontainer}>
					<Categories setSelectedCategory={setSelectedCategory} />
					<Item
						navigation={navigation}
						selectedCategory={selectedCategory}
						products={products}
						setProducts={setProducts}
					/>
				</Layout>

				<ActionSheet ref={actionSheetRef} bounceOnOpen={true}>
					<Layout style={{ margin: 10, paddingBottom: 100 }}>
						<SelectAddress />
					</Layout>
				</ActionSheet>
				{totalItemsInCart > 0 ? <CartButton /> : null}
			</Layout>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 2,
		paddingTop: Constants.statusBarHeight || 50,
		paddingBottom: 10,
		flex: 1,
	},
	subcontainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
	},

	cartButtonContainer: {
		backgroundColor: COLORS.ACCENT,
		margin: 10,
		borderRadius: 4,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		paddingVertical: 14,
		alignItems: 'center',
		// shadowRadius: 10,
		// shadowColor: '#000',
		// shadowOffset: { width: 0, height: 10 },
		// shadowOpacity: 0.3,
	},
});
