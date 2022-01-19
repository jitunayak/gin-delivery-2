import { Layout, Text } from '@ui-kitten/components';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import {
	Dimensions,
	Image,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';

import { COLORS, FONTS } from '../utilities/Constants';

export default function Item({
	navigation,
	selectedCategory,
	products,
	setProducts,
}) {
	const dispatch = useDispatch();
	// const { items } = useSelector((state) => state.cartReducer.selectedItems);
	// items.size === 0 ? setIsCartEmpty(true) : setIsCartEmpty(false);
	function incrementInQuantity(props) {
		//console.log({ increment: props.item });
		const copyOfProducts = [...products];
		copyOfProducts.map((product) => {
			product.id === props.item.id && (product.quantity = product.quantity + 1);
		});
		const data = copyOfProducts.filter(
			(product) => product.id === props.item.id
		);
		dispatch({
			type: 'UPDATE_QUANTITY',
			payload: data,
		});

		setProducts(copyOfProducts);
		//navigation.navigate("Order");
	}
	function decrementInQuantity(props) {
		if (props.item.quantity === 1) {
			dispatch({
				type: 'REMOVE_FROM_CART',
				payload: props.item,
			});
		}
		const copyOfProducts = [...products];
		copyOfProducts.map((product) => {
			product.id === props.item.id && (product.quantity = product.quantity - 1);
		});

		const data = copyOfProducts.filter(
			(product) => product.id === props.item.id
		);
		dispatch({
			type: 'UPDATE_QUANTITY',
			payload: data,
		});

		setProducts(copyOfProducts);
	}
	function AddButton(props) {
		return (
			<TouchableOpacity
				onPress={() => {
					Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
					dispatch({
						type: 'ADD_TO_CART',
						payload: props.item,
					});
					incrementInQuantity(props);
				}}
				style={{
					width: Dimensions.get('window').width * 0.22,
					height: 40,
					borderColor: COLORS.PRIMARY,
					borderWidth: 1,
					alignItems: 'center',
					justifyContent: 'center',
					borderRadius: 4,
				}}
			>
				<Text style={{ color: COLORS.PRIMARY, fontWeight: 'bold' }}>ADD</Text>
			</TouchableOpacity>
		);
	}
	function QuantityManipulationView(props) {
		// console.log({ "quantity view": props });
		return (
			<Layout
				style={{
					flexDirection: 'row-reverse',
					justifyContent: 'space-around',
					alignItems: 'center',
					width: Dimensions.get('window').width * 0.22,
					height: 40,
					borderColor: COLORS.PRIMARY,
					borderWidth: 1,
					borderRadius: 4,
					// shadowRadius: 20,
					// shadowColor: '#000',
					// shadowOffset: { width: 0, height: 6 },
					// shadowOpacity: 0.1,
				}}
			>
				<TouchableOpacity
					style={{ padding: 6 }}
					onPress={() => {
						incrementInQuantity(props);
						Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
					}}
				>
					<Text
						category={'c1'}
						style={{
							fontSize: FONTS.H1,
							fontWeight: 'bold',
							color: COLORS.PRIMARY,
						}}
					>
						+
					</Text>
				</TouchableOpacity>
				<Text style={{ color: COLORS.PRIMARY, fontWeight: 'bold' }}>
					{props.item.quantity}
				</Text>
				<TouchableOpacity
					style={{ padding: 6 }}
					onPress={() => {
						decrementInQuantity(props);
						Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
					}}
				>
					<Text
						style={{
							fontSize: FONTS.H1,
							fontWeight: 'bold',
							color: COLORS.PRIMARY,
						}}
					>
						-
					</Text>
				</TouchableOpacity>
			</Layout>
		);
	}
	return (
		<ScrollView
			showsVerticalScrollIndicator={true}
			style={{ backgroundColor: COLORS.LIGHT_GREY }}
		>
			<Layout
				style={{
					flexWrap: 'wrap',
					flexDirection: 'row',
					backgroundColor: COLORS.LIGHT_GREY,
				}}
			>
				{products.map((item, index) => {
					return (
						item.category == selectedCategory && (
							<Layout
								style={{
									padding: 18,
									borderWidth: 1,
									borderColor: COLORS.LIGHT_GREY,
								}}
								key={item.id}
							>
								<Image
									source={{ uri: item.image }}
									style={{
										width: Dimensions.get('screen').width * 0.22,
										height: Dimensions.get('screen').width * 0.22,
										backgroundColor: 'transparent',
										margin: 10,
									}}
								/>
								<Text
									category={'c2'}
									style={{
										paddingVertical: 4,
										fontSize: FONTS.H4,
										flexWrap: 'wrap',
										width: Dimensions.get('screen').width * 0.25,
										height: 46,
										textAlign: 'auto',
									}}
								>
									{item.name}
								</Text>
								<Text
									category={'c1'}
									style={{ color: COLORS.GREY, marginBottom: 2 }}
								>
									{item.weight}
								</Text>
								<Text category={'c2'} style={{ paddingVertical: 10 }}>
									₹{item.price}
								</Text>

								{item.quantity > 0 ? (
									<QuantityManipulationView item={item} />
								) : (
									<>
										<AddButton item={item} />
									</>
								)}
							</Layout>
						)
					);
				})}
			</Layout>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	icon: {
		width: 32,
		height: 32,
	},
});
